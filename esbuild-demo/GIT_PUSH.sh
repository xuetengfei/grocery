#!/bin/bash

## chmod +x auto.sh

echo "-------Auto Git Begin-------"
git config --global --unset http.proxy
git config pull.rebase false
git pull
git add .
now="$(date +"%Y-%m-%d %H:%M")"
git commit -m "$(date | md5 )"
echo "****************** commit is:$1 ${now} ***********"
git push origin master
echo "--------End--------"
