#!/usr/bin/env bash

cwd=$(pwd)
# echo $cwd

gzip -c $cwd/www_develop/index.html > $cwd/data/index.html.gz
gzip -c $cwd/www_develop/main.js > $cwd/data/main.js.gz

ls $cwd/data/ -lh

echo 'done'


