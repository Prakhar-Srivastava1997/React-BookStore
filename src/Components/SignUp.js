import React, {useState} from "react";
import axios from "axios";
import "../ComponentCSS/FormCSS.css";

const SignUp = () =>{

    const [inputValue, setInputValue] = useState({
        username:"",
        email:"",
        contact:"",
        password:"",
        address:"",
        pin:""
    });

    const [errorMsg, setErrorMsg] = useState({
        usernameError:'',
        emailError:'',
        contactError:'',
        passwordError:'',
        addressError:'',
        pinError:''
    });

    const[successMsg, setSuccessMsg] = useState({
        successmessage:''
    });

    const [totalRecords, setTotalRecords]=useState([]);
    const [imagePath, setImagePath] = useState("");

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        if(name == "username"){
           const nameval = document.getElementById("username").value
           if(nameval.length<1){
               setErrorMsg({...errorMsg, usernameError:"Field required"})
           }
           else if(nameval.length<3){
            setErrorMsg({...errorMsg, usernameError:"Minimum 3 chars required"})
           }
           else if(nameval.length>30){
            setErrorMsg({...errorMsg, usernameError:"Maximum 30 chars required"})
           }
           else{
            setErrorMsg({...errorMsg, usernameError:""})
           }
        }
        else if(name == "email"){
            const emailval = document.getElementById("email").value
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(emailval.length<1){
                setErrorMsg({...errorMsg, emailError:"Field required"})
            }
            else if(!validRegex.test(emailval)){
                setErrorMsg({...errorMsg, emailError:"Please enter valid email id"})
            }
            else{
             setErrorMsg({...errorMsg, emailError:""})
            }
         }
        else if(name == "contact"){
            const contactval = document.getElementById("contact").value

            if(contactval.length<1){
                setErrorMsg({...errorMsg, contactError:"Field required"})
            }
            else if(contactval.length<10){
             setErrorMsg({...errorMsg, contactError:"Minimum 10 chars required"})
            }
            else if(contactval.length>10){
             setErrorMsg({...errorMsg, contactError:"Maximum 10 chars required"})
            }
            else if(!/^[1-9]{1}[0-9]{9}$/.test(contactval)){
             setErrorMsg({...errorMsg, contactError:"Enter valid phone number"})
            }
            else{
            setErrorMsg({...errorMsg, contactError:""})
            }
        }
        else if(name == "password"){
            const passval = document.getElementById("password").value

            if(passval.length<1){
                setErrorMsg({...errorMsg, passwordError:"Field required"})
            }
            else if(passval.length<8){
             setErrorMsg({...errorMsg, passwordError:"Minimum 8 chars required"})
            }
            else if(passval.length>15){
             setErrorMsg({...errorMsg, passwordError:"Maximum 15 chars required"})
            }
            else{
            setErrorMsg({...errorMsg, passwordError:""})
            }
        }
        else if(name == "address"){
            const addressval = document.getElementById("address").value
            if(addressval.length<1){
                setErrorMsg({...errorMsg, addressError:"Field required"})
            }
            else if(addressval.length<5){
             setErrorMsg({...errorMsg, addressError:"Minimum 5 chars required"})
            }
            else if(addressval.length>500){
             setErrorMsg({...errorMsg, addressError:"Maximum 500 chars required"})
            }
            else{
            setErrorMsg({...errorMsg, addressError:""})
            }
        }
        else if(name == "pin"){
            const pinval = document.getElementById("pin").value
            if(pinval.length<1){
                setErrorMsg({...errorMsg, pinError:"Field required"})
            }
            else if(pinval.length<6){
             setErrorMsg({...errorMsg, pinError:"Minimum 6 chars required"})
            }
            else if(pinval.length>6){
             setErrorMsg({...errorMsg, pinError:"Maximum 6 chars required"})
            }
            else if(!/^[1-9]{1}[0-9]{5}/.test(pinval)){
                setErrorMsg({...errorMsg, pinError:"Enter valid pin code"}) 
            }
            else{
            setErrorMsg({...errorMsg, pinError:""})
            }
        }
        
        setInputValue({...inputValue, [name]:value})
        
    }

    const handleImage = (e)=>{
        const image = e.target.files[0].name;
        const path = "../Images/"+image;
        setImagePath(path);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(errorMsg.usernameError.length==0 && errorMsg.emailError.length==0 && errorMsg.contactError.length==0 && errorMsg.passwordError.length==0 && errorMsg.addressError.length==0 && errorMsg.pinError.length==0){
            const newProductEntry = {...inputValue, id : new Date().getTime().toString(), userimage:imagePath};
            axios.post("http://localhost:8000/users", newProductEntry).then((res)=>{
                console.log(res);
                setSuccessMsg({...successMsg, successmessage:"User added successfully"});
                setInputValue({username:"", email:"", contact:"", password:"", address:"", pin:"", userimage:""});
            }).catch((error)=>{
                alert(error.message);
            })
            
            setTotalRecords([...totalRecords, newProductEntry]);
            
        }
        else{
            alert("Please fill the form appropriately!!")
        }
    }
    return (
        <>
            <div className="container">
                <div className="form-container">
                <h1>Add User</h1>
                <p className="span-success">{successMsg.successmessage}</p>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" autoComplete="off" 
                        value={inputValue.username} onChange={handleInput}
                        name="username" placeholder="Enter User Name"></input>
                        <span className="span-error">{errorMsg.usernameError}</span>
                    </div>
                    <div>
                        <label htmlFor="email">Email Id</label>
                        <input type="text" id="email" autoComplete="off" 
                        value={inputValue.email} onChange={handleInput}
                        name="email" placeholder="Enter Your Email"></input>
                        <span className="span-error">{errorMsg.emailError}</span>
                    </div>
                    <div>
                        <label htmlFor="contact">Contact #</label>
                        <input type="text" id="contact" autoComplete="off" 
                        value={inputValue.contact} onChange={handleInput}
                        name="contact" placeholder="Enter Mobile Number"></input>
                        <span className="span-error">{errorMsg.contactError}</span>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" autoComplete="off" 
                        value={inputValue.password} onChange={handleInput}
                        name="password" placeholder="Enter Password"></input>
                        <span className="span-error">{errorMsg.passwordError}</span>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" autoComplete="off" 
                        value={inputValue.address} onChange={handleInput}
                        name="address" placeholder="Enter Address"></input>
                        <span className="span-error">{errorMsg.addressError}</span>
                    </div>
                    <div>
                        <label htmlFor="pin">Pin Code</label>
                        <input type="text" id="pin" autoComplete="off" 
                        value={inputValue.pin} onChange={handleInput}
                        name="pin" placeholder="Enter Pin Code"></input>
                        <span className="span-error">{errorMsg.pinError}</span>
                    </div>
                    <div>
                        <label htmlFor="userimage">User Image</label>
                        <input type="file" id="userimage" 
                        value={inputValue.userimage}
                        onChange={handleImage}
                        name="userimage"></input>
                    </div>
                    <div>
                        <button type="submit">Add User Now</button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;