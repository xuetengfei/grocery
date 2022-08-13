#!/bin/bash

## chmod +x auto.sh
git add .
now="$(date +"%Y-%m-%d %H:%M")"
git commit -m "$(date | md5 )"
