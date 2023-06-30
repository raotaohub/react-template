## quick start

```shell
cd react-template
npm i
npm run start

```

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
