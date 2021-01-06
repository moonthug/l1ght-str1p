#!/bin/bash

APP_NAME="l1ght-str1p"
INSTALL_PARENT="/opt"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"
UPDATE_VERSION=$(curl https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/version)
CURRENT_VERSION=$(cat version)

if [ "$CURRENT_VERSION" != "$UPDATE_VERSION" ]
then

  cd /tmp || exit

  curl "https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/$UPDATE_VERSION" -o l1ght-str1p.tar.gz

  rm -rf ./dist
  tar -zxvf l1ght-str1p.tar.gz

  pkill -f 'l1ght-str1p'
  rm -rf "$INSTALL_DIR"

  mv ./dist "$INSTALL_DIR"
  cd "$INSTALL_DIR"
fi
