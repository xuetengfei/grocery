#!/bin/bash

echo "-------Auto Git Begin-------"
git pull
git add .
now="$(date +"%Y-%m-%d %H:%M")"
git commit -m data | md5
echo "****************** commit is:$1 ${now} ***********"
git push origin master
echo "--------End--------"