#!/bin/bash

# 自动生成雪碧图工具
# 主要依赖于gulp-sprite

# npm or cnpm will be used
myNpm=''

# test npm
which npm >/dev/null

if [ $? -ne 0 ]; then
  echo 'npm is not installed in your machine!'
  exit 1
else
  myNpm=npm
fi

# test cnpm
which cnpm >/dev/null

if [ $? -eq 0 ]; then
  myNpm=cnpm
fi

# install packages
echo '--- start npm install ---'
$myNpm install

# run sprite task
echo '--- start run sprite task ---'
$myNpm run sprite