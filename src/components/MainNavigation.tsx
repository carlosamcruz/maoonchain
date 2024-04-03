import React, { useState } from 'react'

const MainNavigation = () => {
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
  )
}

export default MainNavigation