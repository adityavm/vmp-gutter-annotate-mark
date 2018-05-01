"use babel";
"use strict";

let {CompositeDisposable} = require("atom");

module.exports = {

  decorations: {},

  activate () {
    this.subscriptions = new CompositeDisposable();
  },

  deactivate () {
    this.subscriptions.dispose();
    this.subscriptions = null;
  },

  subscribe (...args) {
    this.subscriptions.add(...args);
  },

  // getter / setters

  uniqueIt (name, editor) {
    return `${editor.id}${name}`; // 10a
  },

  getMark (name, editor) {
    return this.decorations[this.uniqueIt(name, editor)];
  },

  saveMark (name, editor, decoration) {
    this.decorations[this.uniqueIt(name, editor)] = decoration;
  },

  // mark listener

  consumeVimModePlus (service) {
    let
      { Base, observeVimStates } = service,
      self = this;

    let observer = (vimState) => {
      vimState.onDidSetMark(({ name, bufferPosition, editor }) => {
        if (name.match(/[^\w]/)) return; // only alpha

        let prevMark;
        if (prevMark = self.getMark(name, editor)) {
          prevMark.destroy();
        }

        let
          marker = editor.markBufferPosition(bufferPosition, { invalidate: "never" }),
          decoration = editor.decorateMarker(marker, { type: "line-number", class: `vmp-mark-${name}`});

        self.saveMark(name, editor, decoration);
      });
    };

    this.subscribe(observeVimStates(observer));
  },
};
