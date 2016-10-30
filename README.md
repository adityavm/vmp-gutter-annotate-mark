# vim-mode-plus-gutter-annotate-mark

https://atom.io/packages/vmp-gutter-annotate-mark

A plugin for [vim-mode-plus][1] that adds a mark specific class to the gutter so that it can be specially styled.

![Screenshot](https://raw.githubusercontent.com/adityavm/vmp-gutter-annotate-mark/master/screenshot.png)

# Usage

This plugin needs the excellent [vim-mode-plus][1] plugin. Once you've installed both, set marks as usual (with `m`). Your gutter will now show the name of the mark in orange.

Included is a "literal" theme which marks the gutter literally, i.e. it puts the name of the mark in the gutter. You can overwrite this in your user stylesheet to suit your preference.

## Additional Notes

Currently, the plugin only annotates for alphabetical marks (`[a-z]`), as it's clearer when putting the name of the mark in the gutter. Future themes and settings could potentially allow more or all marks to be annotated in the gutter.

## Known Issues

* For lines with multiple marks, it only shows the highest alphabetical value (z > y).

[1]: https://github.com/t9md/atom-vim-mode-plus
