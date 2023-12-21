import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path="/logIn" element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
      
    </div>
  );
}

export default App;
