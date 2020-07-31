# find . -empty -delete
# find /some/path -empty  -delete

find $PWD/* -empty | xargs rm