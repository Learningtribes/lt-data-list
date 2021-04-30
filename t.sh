#!/usr/bin/env bash

node ./r.js
npm run transpile
##npm run build
npm publish --access public

cd ../hawthorn/platform
npm install --save lt-react-data-list
