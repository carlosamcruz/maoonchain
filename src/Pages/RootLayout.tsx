import React, { Fragment } from 'react'
import MainNavigation from '../components/MainNavigation'
import { Outlet, useLocation } from 'react-router-dom'
import Home00WeBSVmenu from './Home00WeBSVmenu';

const RootLayout = () => {
  let location = useLocation();
  console.log(location.pathname)

  const outletReturn = (
    <div style={{'display': 'flex', 'justifyContent': 'space-between', 'background': 'green', 'width': '100vw'}}>
      <div style={{'background': 'red','width': '50%'}}>
        oiiiiiiiiii
      </div>
      <Outlet/>
      <div style={{'background': 'red','width': '50%'}}>
        oiiiiiiiiii
      </div>
    </div> 
  )

  return (
    <Fragment>
        <MainNavigation/>
        <main style={{padding: '0.5%'}}>
          {
            location.pathname === '/' ? <Home00WeBSVmenu/> : outletReturn
          }
        </main>
    </Fragment>
  )
}

export default RootLayout