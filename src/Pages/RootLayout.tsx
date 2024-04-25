

import React, { Fragment } from 'react';
import MainNavigation from '../components/MainNavigation';
import { Outlet, useLocation } from 'react-router-dom';
import Home00WeBSVmenu from './Home00WeBSVmenu';
// import ImgProj from '../../public/img_proj.png';
import ImgProj from '../assets/img_proj.png';

const RootLayout = () => {
  const { pathname } = useLocation();

  console.log(process.env.REACT_APP_DOCKER, window.location.origin)

  const outletReturn = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <img className='logo-maoonchain' src={process.env.REACT_APP_DOCKER ? `/${ImgProj}` : ImgProj} alt="Logo Mao On Chain" />
        </div>
      </div>
      
      <Outlet />
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <img className='logo-maoonchain' src={process.env.REACT_APP_DOCKER ? `/${ImgProj}` : ImgProj} alt="Logo Mao On Chain" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <MainNavigation />
      <main style={{ padding: '0.5%' }}>
        {pathname === '/' ? <Home00WeBSVmenu /> : outletReturn}
      </main>
    </Fragment>
  );
};

export default RootLayout;