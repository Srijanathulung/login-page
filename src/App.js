import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import React, { useState } from 'react';
import Home from './components/Home/Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }
  return (
    <React.Fragment>

      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
      {!isLoggedIn && <Login onLogin={() => loginHandler()} />}
      {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>

    </React.Fragment>
  );
}

export default App;
