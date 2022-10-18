import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <main>
        <h2>Welcome to the home page</h2>
      </main>
      <nav>
        <Link to='/about'>about</Link>
      </nav>
    </div>
  )
}
