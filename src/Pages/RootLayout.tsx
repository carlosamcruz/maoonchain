

import React, { Fragment } from 'react';
import MainNavigation from '../components/MainNavigation';
import { Outlet, useLocation } from 'react-router-dom';
import Home00WeBSVmenu from './Home00WeBSVmenu';
import ImgProj from '../../public/img_proj.png';

const RootLayout = () => {
  const { pathname } = useLocation();

  const outletReturn = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <img className='logo-maoonchain' src={ImgProj} alt="Logo Mao On Chain" />
        </div>
      </div>
      
      <Outlet />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <img className='logo-maoonchain' src={ImgProj} alt="Logo Mao On Chain" />
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