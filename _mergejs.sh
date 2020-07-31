#!/bin/bash
mkdir -p bakFile;
echo "//" `date "+%Y-%m-%d-%H-%M-%S"` >> bakFile/merged.js; 
cat *.js >> bakFile/merged.js;
rm *.js