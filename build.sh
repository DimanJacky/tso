#!/bin/sh
set -e
sed -i "s|[[:digit:]]*\.[[:digit:]]*\.[[:digit:]]*\.[[:digit:]]*:5000|127.0.0.1:5000|g" src/utils/globalConst.js
npm install
npm update
npm run build
mkdir -p cmake-build
cd cmake-build
cmake ../pkg
make package
