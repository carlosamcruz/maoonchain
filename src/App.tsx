import { useState } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import Home00WeBSVmenu from './Pages/Home00WeBSVmenu';
import Page01TX from './Pages/Page01TX';
import Page03Read from './Pages/Page03Read';
import Page12TokenDCreate from './Pages/Page12TokenDCreate';
import Page13TokenDReshape from './Pages/Page13TokenDReshape';
import Page14TokenDTransfer from './Pages/Page14TokenDTransfer';
import Page15TokenDMelt from './Pages/Page15TokenDMelt';
import Page16TokenOLock from './Pages/Page16TokenOLock';
import Page18TokenLockCancel from './Pages/Page18TokenLockCancel';
import Page19TokenBuy from './Pages/Page19TokenBuy';

import './App.css';

function App() {
  const [showHomeDropdown, setShowHomeDropdown] = useState<boolean>(false);

  const [showTodoDropdown, setShowTodoDropdown] = useState<boolean>(false);

  const [showDTOrdDropdown, setShowDTOrdDropdown] = useState<boolean>(false);

  const [showOrderLockDropdown, setShowOrderLockDropdown] = useState<boolean>(false);


  const handlePageChange = (page: string) => {
    setShowHomeDropdown(false);
    setShowTodoDropdown(false);
    setShowDTOrdDropdown(false)
    setShowOrderLockDropdown(false);

  };

  const routesDef = createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home00WeBSVmenu />}/>
      <Route path='/access' element={<Home passedData=''/>}/>
      <Route path='/send-sats' element={<Page01TX />}/>
      <Route path='/smart-ordinals/ordinals-token/create' element={<Page12TokenDCreate passedData={'Ordinals'}/>}/>
      <Route path='/smart-ordinals/ordinals-token/reshape' element={<Page13TokenDReshape passedData={'Ordinals'}/>}/>
      <Route path='/smart-ordinals/ordinals-token/transfer' element={<Page14TokenDTransfer passedData={'Ordinals'}/>}/>
      <Route path='/smart-ordinals/ordinals-token/melt' element={<Page15TokenDMelt passedData={'Ordinals'}/>}/>
      <Route path='/smart-ordinals/ordinals-token/details' element={<Page03Read passedData={''}/>}/>
      <Route path='/smart-ordinals/market/order-lock' element={<Page16TokenOLock passedData={'p2pkh'}/>}/>
      <Route path='/smart-ordinals/market/cancel' element={<Page18TokenLockCancel/>}/>
      <Route path='/smart-ordinals/market/buy' element={<Page19TokenBuy/>}/>
      <Route path='/smart-ordinals/market/details' element={<Page03Read passedData={'OLock'}/>}/>
      
    </Route>
  )

  const router = createBrowserRouter(routesDef);

  return (


        <div className="App">

            <nav className="navbar">
              <div className="dropdown">
                <button className="button" 
                    onClick={() => {  setShowHomeDropdown(!showHomeDropdown); 
                                    setShowTodoDropdown(false);  
                                    setShowOrderLockDropdown(false)}}>
                  Home
                </button>
                {showHomeDropdown && (
                  <div className="dropdown-content">

                    <button className="dropdown-button" onClick={() => handlePageChange('home')}>
                      Access
                    </button>

                    <button className="dropdown-button" 
                          onClick={() => handlePageChange('home02')}>
                        Send Sats
                    </button>

                    <button className="dropdown-button" onClick={() => handlePageChange('home00WeBSVmenu')}>
                      Reception
                    </button>


                  </div>
                )}
              </div>

              <div className="dropdown">
                <button className="button" 
                    onClick={() => {  setShowTodoDropdown(!showTodoDropdown); 
                                    setShowHomeDropdown(false);   
                                    setShowOrderLockDropdown(false)}}>
                  Smart Ord
                </button>
                {showTodoDropdown && (
                  <div className="dropdown-content">

                      <button className="dropdown-button" 
                          onClick={() => {setShowDTOrdDropdown(!showDTOrdDropdown);  
                            setShowOrderLockDropdown(false) }}>
                        1SatOrdinals
                      </button>
                      {showDTOrdDropdown && (
                        <div className="button">

                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto',  marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home21')}>
                            Create
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home22')}>
                            Reshape
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home23')}>
                            Transfer
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home24')}>
                            Melt
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home04')}>
                            Details
                          </button>


                        </div>
                      )}



                      <button className="dropdown-button" 
                          onClick={() => {setShowOrderLockDropdown(!showOrderLockDropdown);   
                          setShowDTOrdDropdown(false)}}>
                        Market OnChain
                      </button>
                      {showOrderLockDropdown && (
                        <div className="button">


                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home16b')}>
                            Order Lock
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home16d')}>
                            Cancel
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home16e')}>
                            Buy
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} onClick={() => handlePageChange('home16f')}>
                            Details
                          </button>

                        </div>
                      )}
                    
                  </div>
                )}
              </div>

            </nav>

            <RouterProvider router={router}/>

        </div>

 

  );
}

export default App;
