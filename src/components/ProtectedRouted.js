import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  console.log('is', isLoggedIn)
  return (isLoggedIn ? children : <Navigate to="./sign-up" />)
}
  


export default ProtectedRoute; 