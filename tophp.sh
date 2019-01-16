#!/bin/sh
if [ "$#" -lt 2 ]
 then
       echo '缺少路径参数'
       echo '例子: sh toStatic.sh ymz test'
       exit
fi

echo '开始复制'
rm -rf /data/hongdoulive2.0/origingit/hongdouH5/Application/Hongdou/View/Viewsh5/$1/$2.html
mkdir -p /data/hongdoulive2.0/origingit/hongdouH5/Application/Hongdou/View/Viewsh5/$1
cp ./dist/views/$1/$2.html /data/hongdoulive2.0/origingit/hongdouH5/Application/Hongdou/View/Viewsh5/$1/$2.html

rm -rf /data/hongdoulive2.0/origingit/hongdouH5/live/static/css/views/$1/$2.css
mkdir -p /data/hongdoulive2.0/origingit/hongdouH5/live/static/css/views/$1
cp ./dist/static/css/views/$1/$2.css /data/hongdoulive2.0/origingit/hongdouH5/live/static/css/views/$1/$2.css

rm -rf /data/hongdoulive2.0/origingit/hongdouH5/live/static/js/views/$1/$2.js
mkdir -p /data/hongdoulive2.0/origingit/hongdouH5/live/static/js/views/$1
cp ./dist/static/js/views/$1/$2.js /data/hongdoulive2.0/origingit/hongdouH5/live/static/js/views/$1/$2.js
cp ./dist/static/js/vendor.js /data/hongdoulive2.0/origingit/hongdouH5/live/static/js/vendor.js
echo '拷贝完毕'
