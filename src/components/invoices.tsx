import React from 'react'
import { useLocation, Link, NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { getInvoices } from '../data/data'

function QueryNavLink({ to, ...props }: any) {
  // 自定义行为
  let location = useLocation()
  return <NavLink to={to + location.search} {...props} />
}

function BrandLink({ brand, ...props }: any) {
  let [params] = useSearchParams()
  let isActive = params.getAll('brand').includes(brand)
  if (!isActive) {
    params.append('brand', brand)
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(([key, value]) => key !== 'brand' || value !== brand)
    )
  }
  return <Link style={{ color: isActive ? 'red' : '' }} to={`/shoes?${params.toString()}`} {...props} />
}

export default function Invoices() {
  let invoices = getInvoices()
  let [searchParams, setSearchParams] = useSearchParams()

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            let filter = event.target.value
            if (filter) {
              setSearchParams({ filter })
            } else {
              setSearchParams({})
            }
          }}
        />

        {invoices
          .filter(invoice => {
            let filter = searchParams.get('filter')
            if (!filter) return true
            let name = invoice.name.toLowerCase()
            return name.indexOf(filter.toLowerCase()) > -1
          })
          .map(invoice => (
            <NavLink
              className={({ isActive }) => (isActive ? 'cur-pointer' : '')}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                }
              }}
              to={`/layout/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>

      {/* 动态路由出口 */}
      <main
        style={{
          marginLeft: '1rem',
          border: '1px solid black',
          padding: '1rem',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
