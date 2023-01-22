import React, { useEffect, useState }from "react";
import "../ComponentCSS/FormCSS.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>{

    const [inputValue, setInputValue] = useState({
        productname:"",
        productauthor:"",
        productcategory:"",
        productdescription:"",
        productprice:""
    });

    const navigate= useNavigate();

    const [errorMsg, setErrorMsg] = useState({
        productnameError:'',
        productauthorError:'',
        productcategoryError:'',
        productdescriptionError:'',
        productpriceError:''
    });

    const[successMsg, setSuccessMsg] = useState({
        successmessage:''
    });

    const [totalRecords, setTotalRecords]=useState([]);
    const [imagePath, setImagePath] = useState("");

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        if(name == "productname"){
           const nameval = document.getElementById("productname").value
           if(nameval.length<1){
               setErrorMsg({...errorMsg, productnameError:"Field required"})
           }
           else if(nameval.length<3){
            setErrorMsg({...errorMsg, productnameError:"Minimum 3 chars required"})
           }
           else if(nameval.length>30){
            setErrorMsg({...errorMsg, productnameError:"Maximum 30 chars required"})
           }
           else{
            setErrorMsg({...errorMsg, productnameError:""})
           }
        }
        else if(name == "productauthor"){
            const anameval = document.getElementById("productauthor").value
            if(anameval.length<1){
                setErrorMsg({...errorMsg, productauthorError:"Field required"})
            }
            else if(anameval.length<3){
             setErrorMsg({...errorMsg, productauthorError:"Minimum 3 chars required"})
            }
            else if(anameval.length>30){
             setErrorMsg({...errorMsg, productauthorError:"Maximum 30 chars required"})
            }
            else{
             setErrorMsg({...errorMsg, productauthorError:""})
            }
         }
        else if(name == "productcategory"){
            const categoryval = document.getElementById("productcategory").value

            if(categoryval.length<1){
                setErrorMsg({...errorMsg, productcategoryError:"Field required"})
            }
            else if(categoryval.length<5){
             setErrorMsg({...errorMsg, productcategoryError:"Minimum 5 chars required"})
            }
            else if(categoryval.length>20){
             setErrorMsg({...errorMsg, productcategoryError:"Maximum 20 chars required"})
            }
            else{
            setErrorMsg({...errorMsg, productcategoryError:""})
            }
        }
        else if(name == "productdescription"){
            const descriptionval = document.getElementById("productdescription").value

            if(descriptionval.length<1){
                setErrorMsg({...errorMsg, productdescriptionError:"Field required"})
            }
            else if(descriptionval.length<4){
             setErrorMsg({...errorMsg, productdescriptionError:"Minimum 4 chars required"})
            }
            else if(descriptionval.length>500){
             setErrorMsg({...errorMsg, productdescriptionError:"Maximum 500 chars required"})
            }
            else{
            setErrorMsg({...errorMsg, productdescriptionError:""})
            }
        }
        else if(name == "productprice"){
            const priceval = document.getElementById("productprice").value
            const reg = new RegExp('^[0-9]+$')
            if(priceval.length<1){
                setErrorMsg({...errorMsg, productpriceError:"Field required"})
            }
            else if(priceval.length<3){
             setErrorMsg({...errorMsg, productpriceError:"Minimum 3 chars required"})
            }
            else if(priceval.length>6){
             setErrorMsg({...errorMsg, productpriceError:"Maximum 6 chars required"})
            }
            else if(!reg.test(priceval)){
             setErrorMsg({...errorMsg, productpriceError:"Numeric chars only"})  
            }
            else{
            setErrorMsg({...errorMsg, productpriceError:""})
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

        if(errorMsg.productnameError.length==0 && errorMsg.productauthorError.length==0 && errorMsg.productcategoryError.length==0 && errorMsg.productdescriptionError.length==0 && errorMsg.productpriceError.length==0){
            const newProductEntry = {...inputValue, id : new Date().getTime().toString(), productimage:imagePath};
            axios.post("http://localhost:8000/products", newProductEntry).then((res)=>{
                console.log(res);
                setSuccessMsg({...successMsg, successmessage:"Product added successfully"});
                setInputValue({productname:"", productauthor:"", productcategory:"", productdescription:"", productprice:"", productimage:""});
            }).catch((error)=>{
                alert(error.message);
            })
            
            setTotalRecords([...totalRecords, newProductEntry]);
            
        }
        else{
            alert("Please fill the form appropriately!!")
        }
    }


    useEffect(()=>{
        if(!localStorage.getItem("AdminLogin")){
          navigate("/error")  
        }
    }, [])
    return (
        <>
            <div className="container">
                <div className="form-container">
                <h1>Add Book</h1>
                <p className="span-success">{successMsg.successmessage}</p>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productname">Book Name</label>
                        <input type="text" id="productname" autoComplete="off" 
                        value={inputValue.productname} onChange={handleInput}
                        name="productname" placeholder="Enter Book Name"></input>
                        <span className="span-error">{errorMsg.productnameError}</span>
                    </div>
                    <div>
                        <label htmlFor="productauthor">Author Name</label>
                        <input type="text" id="productauthor" autoComplete="off" 
                        value={inputValue.productauthor} onChange={handleInput}
                        name="productauthor" placeholder="Enter Author Name"></input>
                        <span className="span-error">{errorMsg.productauthorError}</span>
                    </div>
                    <div>
                        <label htmlFor="productcategory">Book Category</label>
                        <input type="text" id="productcategory" autoComplete="off" 
                        value={inputValue.productcategory} onChange={handleInput}
                        name="productcategory" placeholder="Enter Book Category"></input>
                        <span className="span-error">{errorMsg.productcategoryError}</span>
                    </div>
                    <div>
                        <label htmlFor="productdescription">Book Description</label>
                        <input type="text" id="productdescription" autoComplete="off" 
                        value={inputValue.productdescription} onChange={handleInput}
                        name="productdescription" placeholder="Enter Book Description"></input>
                        <span className="span-error">{errorMsg.productdescriptionError}</span>
                    </div>
                    <div>
                        <label htmlFor="productprice">Book Price($)</label>
                        <input type="text" id="productprice" autoComplete="off" 
                        value={inputValue.productprice} onChange={handleInput}
                        name="productprice" placeholder="Enter Book Price"></input>
                        <span className="span-error">{errorMsg.productpriceError}</span>
                    </div>
                    <div>
                        <label htmlFor="productimage">Book Image</label>
                        <input type="file" id="productimage" 
                        value={inputValue.productimage}
                        onChange={handleImage}
                        name="productimage"></input>
                    </div>
                    <div>
                        <button type="submit">Add Book Now</button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct;