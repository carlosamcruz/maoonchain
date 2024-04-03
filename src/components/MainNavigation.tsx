import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    const [showHomeDropdown, setShowHomeDropdown] = useState<boolean>(false);

    const [showTodoDropdown, setShowTodoDropdown] = useState<boolean>(false);
  
    const [showDTOrdDropdown, setShowDTOrdDropdown] = useState<boolean>(false);
  
    const [showOrderLockDropdown, setShowOrderLockDropdown] = useState<boolean>(false);
  
  return (
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
                     <NavLink to='/' className='dropdown-button' end>
                      Reception
                    </NavLink>

                    <NavLink to='/access' className='dropdown-button' end>
                    Access
                    </NavLink>

                    <NavLink to='/send-sats' className='dropdown-button' end>
                    Send Sats
                    </NavLink>

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

                          <NavLink to="/smart-ordinals/ordinals-token/create" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto',  marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Create
                          </NavLink>
                          <NavLink to="/smart-ordinals/ordinals-token/reshape" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Reshape
                          </NavLink>
                          <NavLink to="/smart-ordinals/ordinals-token/transfer" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Transfer
                          </NavLink>
                          <NavLink to="/smart-ordinals/ordinals-token/melt" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Melt
                          </NavLink>
                          <NavLink to="/smart-ordinals/ordinals-token/details" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Details
                          </NavLink>


                        </div>
                      )}



                      <button className="dropdown-button" 
                          onClick={() => {setShowOrderLockDropdown(!showOrderLockDropdown);   
                          setShowDTOrdDropdown(false)}}>
                        Market OnChain
                      </button>
                      {showOrderLockDropdown && (
                        <div className="button">


                          <NavLink to="/smart-ordinals/market/order-lock" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Order Lock
                          </NavLink>
                          <NavLink to="/smart-ordinals/market/cancel" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Cancel
                          </NavLink>
                          <NavLink to="/smart-ordinals/market/buy" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Buy
                          </NavLink>
                          <NavLink to="/smart-ordinals/market/details" className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}} end>
                            Details
                          </NavLink>

                        </div>
                      )}
                    
                  </div>
                )}
              </div>

            </nav>
  )
}

export default MainNavigation