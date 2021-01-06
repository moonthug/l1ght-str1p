#!/bin/bash

APP_NAME="l1ght-str1p"
INSTALL_PARENT="/opt"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"
INSTALL_VERSION=$(curl https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/version)

cd /tmp || exit

echo "https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/$INSTALL_VERSION";
curl "https://polyglot-rodeo-deploy.s3.eu-west-2.amazonaws.com/l1ght-str1p/$INSTALL_VERSION" -o l1ght-str1p.tar.gz

rm -rf ./dist
tar -zxvf l1ght-str1p.tar.gz

pkill -f 'l1ght-str1p'
rm -rf "$INSTALL_DIR"

mv ./dist "$INSTALL_DIR"
