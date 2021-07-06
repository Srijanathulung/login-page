import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password)=>{}
});

//building custom context
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //getItem will retrieve the data
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedInKey');
      
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      },[])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedInKey');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedInKey', '1');
        setIsLoggedIn(true);
    }
    return <AuthContext.Provider
        value={
            {
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }
        }>
        {props.children}
         </AuthContext.Provider>
 }

export default AuthContext;
