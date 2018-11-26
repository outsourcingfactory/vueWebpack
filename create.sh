#!/bin/sh
if [ "$#" -lt 2 ]
 then
       echo '缺少文件名参数'
       echo '例子: sh create.sh wechat mmm'
       exit
fi
if [ -d "./src/views/$1/$2" ]; then
    echo '已经存在该项目,直接启动'
    #替换配置文件中的启动文件
    sed -i.backup "s#productionEntries:{.*}#productionEntries:{\'views/$1/$2\': \'./src/views/$1/$2/$2.js\',}#g" ./config/index.js
    sed -i.backup "s#productionPages:{.*}#productionPages:{\'views/$1/$2\': \'./src/views/$1/$2/$2.html\',}#g" ./config/index.js
    #替换打开页面文件
    sed -i.backup "s#var uri = 'http://localhost:' + port+'.*'#var uri = 'http://localhost:' + port+'/views/$1/$2.html'#g" ./build/dev-server.js
    npm run dev

    else

    mkdir -p ./src/views/$1/$2

    #拷贝模板文件
    cp ./normoldemo/normoldemo.html ./src/views/$1/$2/$2.html
    cp ./normoldemo/normoldemo.js ./src/views/$1/$2/$2.js
    cp ./normoldemo/normoldemo.vue ./src/views/$1/$2/$2.vue

    #替换js文件中引用的vue名称
    find "./src/views/$1/$2/$2.js" | xargs sed -i "" "s/normoldemo/$2/g"

    #替换配置文件中的启动文件
    sed -i.backup "s#productionEntries:{.*}#productionEntries:{\'views/$1/$2\': \'./src/views/$1/$2/$2.js\',}#g" ./config/index.js
    sed -i.backup "s#productionPages:{.*}#productionPages:{\'views/$1/$2\': \'./src/views/$1/$2/$2.html\',}#g" ./config/index.js


    #替换打开页面文件
    sed -i.backup "s#var uri = 'http://localhost:' + port+'.*'#var uri = 'http://localhost:' + port+'/views/$1/$2.html'#g" ./build/dev-server.js
    npm run dev
fi



