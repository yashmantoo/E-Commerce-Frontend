import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Signup from './components/Signup'
import Login from './components/Login'
import Productpage from './Admin/Productpage'
import Dashboard from './components/Dashboard'
import Collectionpage from './Admin/Collectionpage'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Orders from './pages/orders'
import Userspage from './Admin/Userspage'



function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path="/logIn" element = {<Login/>}/>
          <Route path='profile' element = {<Profile/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path="/dashboard/collection" element = {<Collectionpage/>}/>
          <Route path='/dashboard/products' element = {<Productpage/>}/>
          <Route path='/dashboard/users' element = {<Userspage/>}/>
          <Route path='/shop' element = {<Shop/>}/>
          <Route path='/product/:id' element = {<Product/>}/>
          <Route path='/cart' element = {<Cart/>}/>
          <Route path='/checkout' element = {<Checkout/>}/>
          <Route path='/success' element = {<Success/>}/>
          <Route path='/orders' element = {<Orders/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
      
    </div>
  );
}

export default App;
