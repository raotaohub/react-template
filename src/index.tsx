import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'

import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import './styles.css'
import './styles.less'

Sentry.init({
  dsn: 'https://46298d85607a4867a06a2e8c2866a096@o4504100121542656.ingest.sentry.io/4504100125474816',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const mountNode = document.getElementById('app')

ReactDOM.createRoot(mountNode!).render(
  <React.StrictMode>
    <HashRouter>
      <App name="Jane" />
    </HashRouter>
  </React.StrictMode>,
)
