import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';

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
    <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
    }}
    >

      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={() => loginHandler()} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {/* {isLoggedIn ? <Home onLogout={logoutHandler} /> : <Login onLogin={() => loginHandler()} /> } */}
      </main>
      </AuthContext.Provider>


  );
}

export default App;
