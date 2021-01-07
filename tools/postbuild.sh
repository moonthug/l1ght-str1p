#!/bin/bash
cp package.json dist/package.json
cd dist/
npm install --only=production

cp ../libs/rpi-ws281x-native.tar.gz ./node_modules
cd node_modules
tar -zxvf rpi-ws281x-native.tar.gz
