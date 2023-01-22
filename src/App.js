import React from "react";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import Cart from "./Components/Cart";
import ViewOrders from "./Components/ViewOrders";
import Error from "./Components/Error";

const App=()=>{
  return (<>
         {/* <Home /> */}
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/contactus" element={<ContactUs/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/admindashboard" element={<AdminDashboard/>}/>
            <Route path="/userdashboard" element={<UserDashboard/>}/>
            <Route path="/cart" element={< Cart/>}/>
            <Route path="/vieworders" element={< ViewOrders/>} />
            <Route path="/error" element={<Error/>}/>
         </Routes>
        </>  
  ) 
}
/* <></>--->Shortcut for React.Fragment */
export default App;
