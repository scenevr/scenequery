# SceneQuery

[![Build Status](https://travis-ci.org/scenevr/scenequery.svg?branch=master)](https://travis-ci.org/scenevr/scenequery)

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/flet/semistandard)

jQuery-like API for SceneVR. SceneVR is a virtual reality environment that uses javascript and the dom as it's API for creating persistent worlds.

This API is very rudimentary and doesn't support the full set of jQuery commands. See the source code to see what is implemented. 

## Contributing

Please send pull requests that implement jQuery functionality! Please try and use only dom level 3 features, and avoid hacks that use the internals of SceneVR. Make sure the code passes `npm test` and complies to the semistandard coding style.

## Errata

When creating a div using `$('<div />')`, attributes and child elements are ignored. Apply attributes and child nodes manually with `.attr()` and `.appendTo()`.