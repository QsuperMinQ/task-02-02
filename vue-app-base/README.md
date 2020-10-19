# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## webpack打包说明文档

>基本功能需要实现对vue项目中的各类资源文件的打包处理

1、此项目涉及到的需要处理的文件类型以及处理的loader：

* vue文件，vue-loader
* JS文件，babel-loader
* LESS文件，less-loader/css-loader/style-loader
* 图片等静态资源，file-loader
* 规范化处理，eslint-loader

2、对于开发阶段和生产阶段，区分不同的配置文件进行打包（webpack.dev.js/webpack.prod.js），把公共的部分提取到公共配置文件中（webpack.common.js）。
具体实现如下

* 公共配置(webpack.common.js)
	* entry: 指定打包的入口文件，这里为'./src/main.js'
	* output: 打包好的文件输出配置，默认路径是是./dist
	* modules.rules 各种文件类型加载处理，具体如第一部分所述
	* plugins:这个值是个数组文件，是此次项目中的自动化构建使用到的插件。此项目包括
		* html-webpack-plugin 处理生成html
* 开发阶段配置（webpack.dev.js）
	* 安装 webpack-merge 模块，使用merge方法合并公共配置到次文件中。
	* mode:'development',指定当前为开发模式，用于启用相应模式下的webpack内置的优化
	* devtool: 'cheap-eval-source-map',用于显示源文件的映射，快速调试。
	* devServer:安装 webpack-dev-server 模块，配置相关属性，host、port、hot等，配置hot为true时，同时结合webpack.HotModuleReplacementPlugin插件开启HMR热更新
	* plugins: webpack.HotModuleReplacementPlugin配合devServer中的hot设置，用于开启热更新
* 生产阶段配置（webpack.prod.js）
	* 引入 webpack-merge 模块，使用merge方法合并公共配置到次文件中。
	* mode:'production',指定当前为生产模式，用于启用相应模式下的webpack内置的优化
	* plugins:安装并使用 clean-webpack-plugin 插件，用于清除之前的编译文件；安装并使用 copy-webpack-plugin 插件，用于静态资源向目标目录的拷贝

3、在此次打包过程中遇到了两个问题：
	
	* 第一个是样式文件不能正常显示，是因为忽略了vue文件中的 style 模块的处理,加上对 .css 文件的处理就解决了
	* 第二个是在开发模式下自动打开浏览器时报错 "Uncaugt TypeError: Cannot convert undefined or null to object",原因是在 babel-loader 的配置中应该排除 node_modules 即 exclude:/node_modules/