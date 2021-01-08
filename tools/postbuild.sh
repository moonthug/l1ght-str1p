#!/bin/bash
UNAME=`uname`

cp package.json dist/package.json
cp ecosystem.config.js dist/ecosystem.config.js

cd dist/
npm install --only=production

if [[ $UNAME != "Linux" ]]
then
  cp ../libs/rpi-ws281x-native.tar.gz ./node_modules
  cd node_modules
  tar -zxvf rpi-ws281x-native.tar.gz
fi
