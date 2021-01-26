#!/bin/bash

APP_NAME="l1ght-str1p"
HOST_NAME="l1ght-str1p.local"
INSTALL_PARENT="~"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"

# npm run build

echo 'Compressing build...'
tar -czf deploy.tar.gz ./dist

echo 'Cleaning install directory...'
ssh pi@l1ght-str1p.local "sudo rm -rf $INSTALL_DIR"
echo 'Copying build artifact...'
scp deploy.tar.gz "pi@$HOST_NAME:deploy.tar.gz"
echo 'Extracting deploy package...'
ssh pi@l1ght-str1p.local "tar -zxf deploy.tar.gz && mv dist $APP_NAME"
echo 'Starting application...'
ssh pi@l1ght-str1p.local "cd $APP_NAME && sudo pm2 restart ecosystem.config.js"

rm deploy.tar.gz
