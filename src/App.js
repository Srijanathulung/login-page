import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  useEffect(() => {
    //getItem will retrieve the data
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedInKey');
  
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  },[])

  const loginHandler = (email, password) => {
    //1 is represented as true and 0 is false
    localStorage.setItem('isLoggedInKey', '1');
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedInKey');
    setIsLoggedIn(false);
  }
  return (
    <React.Fragment>
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </React.Fragment>


  );
}

export default App;
