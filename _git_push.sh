#!/bin/bash -e

echo "----- Start -----"
git pull
git add .
git commit -m "$(date | md5 )"
git push origin master
echo "----- End -----"

