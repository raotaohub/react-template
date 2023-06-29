# 原则

1. 使用高版本 webpack
2. 压缩
   1. css 如[mini-css-extract]-plugin
   2. js 如[terser-plugin,compression]-plugin
   3. img|png|svg
      1. webpack4 [url,file]-loader ;
      2. webpack5 内置的 module.rules.type
3. 开启缓存
   1. webpack5 的 cache.type = "filesystem"
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
11. development 模式少配置 bundle 优化。

## 性能监控工具 sentry 接入

1. 注册账号打开 https://sentry.io/signup/ 网站，进行注册。

2. 选择对应框架的项目以 react.js 为例 下载 SKD

```shell
npm install --save @sentry/react @sentry/tracing

```

```ts
import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'

Sentry.init({
  dsn: 'https://46298d85607a4867a06a2e8c2866a096@o4504100121542656.ingest.sentry.io/4504100125474816',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(<App />, document.getElementById('root'))

// Can also use with React Concurrent Mode
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```
