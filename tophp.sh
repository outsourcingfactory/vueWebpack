#!/bin/sh
if [ "$#" -lt 2 ]
 then
       echo '缺少路径参数'
       echo '例子: sh toStatic.sh ymz test'
       exit
fi

echo '开始复制'
rm -rf /download/hongdouH5/Application/Hongdou/View/Viewsh5/$1/$2.html
mkdir -p /download/hongdouH5/Application/Hongdou/View/Viewsh5/$1
cp ./dist/views/$1/$2.html /download/hongdouH5/Application/Hongdou/View/Viewsh5/$1/$2.html

rm -rf /download/hongdouH5/live/static/css/views/$1/$2.css
mkdir -p /download/hongdouH5/live/static/css/views/$1
cp ./dist/static/css/views/$1/$2.css /download/hongdouH5/live/static/css/views/$1/$2.css

rm -rf /download/hongdouH5/live/static/js/views/$1/$2.js
mkdir -p /download/hongdouH5/live/static/js/views/$1
cp ./dist/static/js/views/$1/$2.js /download/hongdouH5/live/static/js/views/$1/$2.js
cp ./dist/static/js/vendor.js /download/hongdouH5/live/static/js/vendor.js
echo '拷贝完毕'
