import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Signup from './components/Signup'
import Login from './components/Login'
import Collection from './Admin/Collection'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path="/logIn" element = {<Login/>}/>
          <Route path='dashboard' element = {<Dashboard/>}/>
          <Route path="/collection" element = {<Collection/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
      
    </div>
  );
}

export default App;
