import React, {useContext} from 'react';
import Register from "./pages/Register";
import {AuthContext} from './context/AuthContext'
import Login from './pages/Login';
import Home from './pages/Home';
import './style.scss';
import {
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';

function App() {

  const {currentUser} = useContext(AuthContext)
  console.log('currentUser: ', currentUser);

  const ProtectedRouted = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login' />
    }
    
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route 
            index 
            element={<ProtectedRouted>
                <Home />
              </ProtectedRouted>} 
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
