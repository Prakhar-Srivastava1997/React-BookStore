import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ComponentCSS/FormCSS.css";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Login = () =>{
    const [inputValue, setInputValue] = useState({
        username:"",
        password:""
    })

    const [errorMsg, setErrorMsg] = useState({
        usernameError:'',
        passwordError:''
    })

    const[successMsg, setSuccessMsg] = useState({
        successmessage:''
    })

    const [errorStatus, setErrorStatus] = useState(false);
    const [credMismatch, setCredMismatch] = useState("");
    const [userList, setUserList] = useState([]);
    const [valMatched, setValmatched] = useState(false);

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputValue({...inputValue, [name]:value});
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/users").then((res)=>{
            setUserList(res.data);
        }).catch((error)=>{
            alert(error.message)
        })
    }, [])

    const handleSubmit = (e)=>{  
      e.preventDefault()
      if(valMatched){
        setSuccessMsg({successmessage :"Congratulations ! Login Successful.."})
        setErrorStatus(false)
        if(inputValue.username==="admin" && inputValue.password==="admin123"){
            localStorage.setItem("AdminLogin", "admin")
        }
        else{
            localStorage.setItem("UserLogin", inputValue.username)
        }
      }
      else{
        setCredMismatch("Invalid Credentials ! Try again...")
        setErrorStatus(true)
      }
      
   }

    useEffect(()=>{
        var userobj={}
         userList.forEach((res)=>{
             if(res.username === inputValue.username && res.password === inputValue.password){
                return userobj = res
            }
        })
        
          if(userobj || (inputValue.username==="admin" && inputValue.password==="admin123")){
            setValmatched(true)
          }
          else{
            setValmatched(false)
          }
          
    }, [{inputValue}])

    
    return (
        <>
            <div className="container">
                <div className="form-container">
                <h1>User Login</h1>
                {errorStatus ? <p style={{"color":"red", "fontSize":"1.4rem", "fontWeight":"600"}}>{credMismatch}</p>:<p className="span-success">{successMsg.successmessage}</p>}
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" autoComplete="off" 
                        value={inputValue.username} onChange={handleInput}
                        name="username" placeholder="Enter User Name"></input>
                        <span className="span-error">{errorMsg.usernameError}</span>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" autoComplete="off" 
                        value={inputValue.password} onChange={handleInput}
                        name="password" placeholder="Enter Password"></input>
                        <span className="span-error">{errorMsg.passwordError}</span>
                    </div>
                    <div>
                        <button type="submit">Sign In Now</button>
                    </div>
                    <p className="signup">Don't have account? <Link to="/signup">Sign Up here</Link></p>
                </form>
                {inputValue.username === "admin" && successMsg.successmessage && <Link to="/admindashboard" className="dashboard">View Dashboard</Link>}
                {inputValue.username != "admin" && successMsg.successmessage && <Link to="/userdashboard" className="dashboard">View Dashboard</Link>}
            </div>
            </div>
        </>
    )
}

export default Login;