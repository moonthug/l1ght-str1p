#!/bin/bash

APP_NAME="l1ght-str1p"
HOST_NAME="192.168.1.30"
INSTALL_PARENT="~"
INSTALL_DIR="$INSTALL_PARENT/$APP_NAME"

#######################################
# TRAPS
#

function cleanup {
  echo "Cleaning up..."
  rm deploy.tar.gz
}

trap cleanup EXIT

#######################################
# MAIN
#

# npm run build

echo 'Compressing build...'
tar -czf deploy.tar.gz ./dist

echo 'Cleaning install directory...'
ssh "pi@$HOST_NAME" "sudo rm -rf $INSTALL_DIR"

echo 'Copying build artifact...'
scp deploy.tar.gz "pi@$HOST_NAME:deploy.tar.gz"

echo 'Extracting deploy package...'
ssh "pi@$HOST_NAME" "tar -zxf deploy.tar.gz && mv dist $APP_NAME"

echo 'Starting application...'
ssh "pi@$HOST_NAME" "cd $APP_NAME && sudo pm2 restart ecosystem.config.js"
