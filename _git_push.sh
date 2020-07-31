#!/bin/bash

echo "-------Auto Git Begin-------"
git pull
git add .
now="$(date +"%Y-%m-%d %H:%M")"

Message=date | md5

git commit -m Message
echo "****************** commit is:$1 ${now} ***********"
git push origin master
echo "--------End--------"