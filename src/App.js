import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import React, { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  }
  return (
    <div className="App">

      <MainHeader />
      <Login onLogin={()=>loginHandler() }/>

    </div>
  );
}

export default App;
