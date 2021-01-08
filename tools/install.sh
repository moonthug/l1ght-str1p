#!/bin/bash

APP_NAME="l1ght-str1p"
INSTALL_PARENT="~"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"
INSTALL_VERSION=$(curl https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/version)

cd /tmp || exit

curl "https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/$INSTALL_VERSION" -o l1ght-str1p.tar.gz

tar -zxvf l1ght-str1p.tar.gz

mv ./dist "$INSTALL_DIR"

sudo pm2 restart ecosystem.config.js
