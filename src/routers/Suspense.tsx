import React, { Suspense } from 'react'

const DefaultSpin = () => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    loading...
  </span>
)

type ComponentIProps = Partial<Record<keyof any, any>> | any

const SuspenseComponent = (
  Component: React.LazyExoticComponent<React.ComponentType<ComponentIProps>>,
): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          loading...
        </span>
      }
    >
      <Component />
    </Suspense>
  )
}

export default SuspenseComponent
