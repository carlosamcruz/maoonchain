import React, { Fragment } from 'react'
import MainNavigation from '../components/MainNavigation'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <Fragment>
        <MainNavigation/>
        <main style={{padding: '0.5%'}}>
            <Outlet/>
        </main>
    </Fragment>
  )
}

export default RootLayout