#!/usr/bin/env bash

#环境启动程序
openresty -t;
service openresty start;


WEB_SITE_ROOT_DIR;

cd $WEB_SITE_ROOT_DIR

npm install
npm run clean
npm run build
npm run export

pm2 delete next-js-template;
pm2 start pm2/vpc_prod.json

###################
#上传静态文件
###################
cd $WEB_SITE_ROOT_DIR
./qiniu.sh
