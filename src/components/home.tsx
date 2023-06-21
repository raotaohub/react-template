import React from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../asset/img/reactlogo512.png'

export default function Home() {
  return (
    <div>
      <main>
        <a href="https://reactjs.org" target="_blank">
          <img width={200} src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h2>Welcome to the home page</h2>
      </main>
      <nav>
        <Link to="/about">about</Link>
      </nav>
    </div>
  )
}
