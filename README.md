# 原则

1. 使用高版本 webpack
2. 压缩
   1. css 如[mini-css-extract]-plugin
   2. js 如[terser-plugin,compression]-plugin
   3. img|png|svg
      1. webpack4 [url,file]-loader ;
      2. webpack5 内置的 module.rules.type
3. 开启缓存
   1. webpack5 的 cache.type
   2. module.loader.options.cacheDirectory; 如[babel,eslint,styleint,cache]-loader
4. 构建优化
   1. optimizer.splitChunk 分包大哲学
5. 排除资源
   1. module.loader.rules[{test,exclude,include}]
   2. module.noParse = /lodash|react|.../ ;本身就是内聚的资源不做解析
   3. watchOptions[ignored,aggregateTimeout]
   4. externals[lib] , 通过 cdn 引入 script ，可以排除 lib 在依赖体系中
6. plugins[ForkTsCheckerWebpackPlugin] ts 类型检测是很慢的，剥离 ts 检测
7. source-map
8. resolve.extensions
9. lazy / suspense
10. [hash]
11. development 模式少配置 bundle 优化，就是上述这些。 因为开发环境可以不
