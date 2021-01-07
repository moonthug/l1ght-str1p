#!/bin/bash

APP_NAME="l1ght-str1p"
INSTALL_PARENT="~"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"

# npm run build

tar -czvf deploy.tar.gz ./dist

ssh pi@l1ght-str1p.local "sudo rm -rf $INSTALL_DIR"
echo "put file"
scp deploy.tar.gz "pi@l1ght-str1p.local:deploy.tar.gz"

echo "install"
ssh pi@l1ght-str1p.local "tar -zxvf deploy.tar.gz && mv dist $APP_NAME"

rm deploy.tar.gz
