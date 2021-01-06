#!/bin/bash -e

# echo "----- Start -----"
# find $PWD/* -empty | xargs rm
# git pull
# git add .
# git commit -m "$(date | md5 )"
# git push origin master
# echo "----- End -----"

echo "-------Auto Git Begin-------"
# git config pull.rebase false
git pull --ff-only
git add .
git commit -m "$(date | md5 )"
echo "****************** commit is:$1 ${now} ***********"
git push 
echo "--------End--------"