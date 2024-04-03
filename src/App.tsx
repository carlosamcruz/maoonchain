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
import NotFound from './Pages/NotFound';
import RootLayout from './Pages/RootLayout';

function App() {

  const routesDef = createRoutesFromElements(
    <Route element={<RootLayout/>}>
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
      <Route path='/*' element={<NotFound/>}/>
      
    </Route>
  )

  const router = createBrowserRouter(routesDef);

  return (


      <div className="App">
            <RouterProvider router={router}/>
        </div>

 

  );
}

export default App;
