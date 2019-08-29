module.exports = {
    apps: [ 
        {
            name: 'posts-app', //定义了app的名字
            script: './src/index.js', //入口文件在哪里
            env_production: { //配置环境变量，我们没使用这个环境变量，所以可以不写，但如果用了mogan什么的，就需要写其他环境变量了，然后到package.json改变启动生产环境的命令start：。。。
                NODE_ENV: 'production'
            }
        }
    ]
};
//这里还可以定义max，就是可以最多启动几个server，可以看官方文档，instance