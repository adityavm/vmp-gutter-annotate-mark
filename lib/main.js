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

  consumeVimModePlus (service) {
    let
      { Base, observeVimStates } = service,
      self = this;

    let observer = (vimState) => {
      vimState.onDidSetMark(({ name, bufferPosition, editor }) => {
        if (name.match(/[^\w]/)) return; // only alpha

        if (self.decorations[name]) {
          let dec = self.decorations[name];
          dec.destroy();
        }

        let
          range = { start: bufferPosition, end: bufferPosition },
          marker = editor.markBufferRange(range, {invalidate: "never"}),
          decoration = editor.decorateMarker(marker, { type: "line-number", class: `vmp-mark-${name}`});

        self.decorations[name] = decoration;
      });
    };

    this.subscribe(observeVimStates(observer));
  },
};
