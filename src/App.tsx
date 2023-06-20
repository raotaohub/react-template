import * as React from 'react'
import Router from './routers/index'
import { ErrorBoundary } from './components/common/ErrorBoundry/ErrorBoundry'

interface Props {
  name?: string
}

const App: React.FC<Props> = (props) => {
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={(error) => {
          return <span>{error?.error?.message}</span>
        }}
        onError={(error) => {
          console.log(
            JSON.stringify({
              stack: error?.stack || '',
              message: error?.message || '',
            }),
          )
        }}
      >
        <Router />
      </ErrorBoundary>
    </div>
  )
}

export default App

const worker = new Worker(new URL('./deep-thought.worker.js', import.meta.url))
console.log('import.meta.url', import.meta.url)

worker.postMessage({
  question: 'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
})
worker.onmessage = ({ data: { answer } }) => {
  console.log(answer)
}
