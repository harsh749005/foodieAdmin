import React, { useState } from 'react'
import Login from './Login';
import axios from 'axios';

const Logout = () => {
    // Logout logic here.
  const [logout,setLogout] =useState(false);
  axios.defaults.withCredentials = true;
  axios.get('http://localhost:8081/logout')
   .then((response) => {
    if (response.status === 200) {
        setLogout(true);
        console.log(response);
    }
    }).catch((error) =>{
        console.log(error);
        setLogout(false);
    })
  return (
    <>
        
      {
        logout? 
        <Login/>
        :
        <h1>Logging out...</h1>
      }
    </>
  )
}

export default Logout
