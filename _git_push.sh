#!/bin/bash -e

echo "----- Start -----"
find $PWD/* -empty | xargs rm
git pull
git add .
git commit -m "$(date | md5 )"
git push origin master
echo "----- End -----"

