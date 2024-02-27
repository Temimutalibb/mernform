import React from 'react';
import { Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/Signup';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

const App = () => {
  const token = getToken(false);

  if(token ) {
    return <Login setToken={setToken}/>
  }

  return(  
    <Router>
       <Routes>
          <Route path="/" element={<SignUp/>}/>
         <Route path="/Login" element={<Login/>}/>
       </Routes>
   </Router>
  );
};

export default App;