import React, { useRef, FC, useState } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import './App.css';

import { DefaultProvider, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString } from "scrypt-ts";


import Home from './Home';
//import HomeUser from './HomeUser';
import Home00WeBSVmenu from './Home00WeBSVmenu';

import Page01TX from './Page01TX';

import Page03Read from './Page03Read';

import Page12TokenDCreate from './Page12TokenDCreate';

import Page13TokenDReshape from './Page13TokenDReshape';
import Page14TokenDTransfer from './Page14TokenDTransfer';

import Page15TokenDMelt from './Page15TokenDMelt';

import Page16TokenOLock from './Page16TokenOLock';

import Page18TokenLockCancel from './Page18TokenLockCancel';
import Page19TokenBuy from './Page19TokenBuy';


const provider = new DefaultProvider({network: bsv.Networks.testnet});
let Alice: TestWallet
const privateKey = bsv.PrivateKey.fromHex("79342a4c317817a80a298fe116147a74e4e90912a4f321e588a4db67204e29b0", bsv.Networks.testnet)   

function App() {
//const App: FC = () => {  

//const [currentPage, setCurrentPage] = useState<string>('home');

//const handlePageChange = (page: string) => {
//  setCurrentPage(page);
//};

  const [currentPage, setCurrentPage] = useState<string>('home00WeBSVmenu');
  const [showHomeDropdown, setShowHomeDropdown] = useState<boolean>(false);


  const [showTodoDropdown, setShowTodoDropdown] = useState<boolean>(false);

  const [showSendDropdown, setShowSendDropdown] = useState<boolean>(false);
  const [showDTOrdDropdown, setShowDTOrdDropdown] = useState<boolean>(false);

  const [showOrderLockDropdown, setShowOrderLockDropdown] = useState<boolean>(false);


  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setShowHomeDropdown(false);

    setShowTodoDropdown(false);
    setShowSendDropdown(false);
    setShowDTOrdDropdown(false)
    setShowOrderLockDropdown(false);

  };

  return (


        <div className="App">

            <nav className="navbar">
              <div className="dropdown">
                <button className="button" 
                    onClick={() => {setShowSendDropdown(false);  setShowHomeDropdown(!showHomeDropdown); 
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
                    onClick={() => {setShowSendDropdown(false);  setShowTodoDropdown(!showTodoDropdown); 
                                    setShowHomeDropdown(false);   
                                    setShowOrderLockDropdown(false)}}>
                  Smart Ord
                </button>
                {showTodoDropdown && (
                  <div className="dropdown-content">

                      <button className="dropdown-button" 
                          onClick={() => {setShowDTOrdDropdown(!showDTOrdDropdown);  
                          setShowSendDropdown(false);  setShowOrderLockDropdown(false) }}>
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
                          onClick={() => {setShowOrderLockDropdown(!showOrderLockDropdown); setShowSendDropdown(false);  
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

            {currentPage === 'home' && <Home passedData={''}/>}
            {currentPage === 'homeUser' && <Home passedData={'rapido'} />}
            {currentPage === 'home00WeBSVmenu' && <Home00WeBSVmenu />}
           
            {currentPage === 'home02' && <Page01TX />}

            {currentPage === 'home04' && <Page03Read passedData={''}/>}

            {currentPage === 'home13' && <Page12TokenDCreate passedData={'Drop'}/>}
            {currentPage === 'home14' && <Page13TokenDReshape passedData={'Drop'}/>}
            {currentPage === 'home15' && <Page14TokenDTransfer passedData={'Drop'}/>}
            {currentPage === 'home16' && <Page15TokenDMelt passedData={'Drop'}/>}


            {currentPage === 'home16b' && <Page16TokenOLock passedData={'p2pkh'}/>}
            
            {currentPage === 'home16d' && <Page18TokenLockCancel/>}
            {currentPage === 'home16e' && <Page19TokenBuy/>}
            {currentPage === 'home16f' && <Page03Read passedData={'OLock'}/>}



            {currentPage === 'home17' && <Page12TokenDCreate passedData={'Return'}/>}
            {currentPage === 'home18' && <Page13TokenDReshape passedData={'Return'}/>}
            {currentPage === 'home19' && <Page14TokenDTransfer passedData={'Return'}/>}
            {currentPage === 'home20' && <Page15TokenDMelt passedData={'Return'}/>}

            {currentPage === 'home21' && <Page12TokenDCreate passedData={'Ordinals'}/>}
            {currentPage === 'home22' && <Page13TokenDReshape passedData={'Ordinals'}/>}
            {currentPage === 'home23' && <Page14TokenDTransfer passedData={'Ordinals'}/>}
            {currentPage === 'home24' && <Page15TokenDMelt passedData={'Ordinals'}/>}

            {currentPage === 'home25' && <Page12TokenDCreate passedData={'TrueR'}/>}
            {currentPage === 'home26' && <Page12TokenDCreate passedData={'TrueD'}/>}
            {currentPage === 'home27' && <Page15TokenDMelt passedData={'True'}/>}           

            {currentPage === 'home30stamps' && <Page12TokenDCreate passedData={'Stamps'}/>}
            {currentPage === 'home31stamps' && <Page13TokenDReshape passedData={'Stamps'}/>}
            {currentPage === 'home32stamps' && <Page14TokenDTransfer passedData={'Stamps'}/>}
            {currentPage === 'home33stamps' && <Page15TokenDMelt passedData={'Stamps'}/>}

            {currentPage === 'GPToken09' && <Page03Read passedData={'GPToken'}/>}          

        </div>

 

  );
}

export default App;
