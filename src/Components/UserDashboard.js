import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ComponentCSS/UserCSS.css";
import { useNavigate } from "react-router-dom";


var counter = 0
var cartArray=[]

const UserDashboard = () => {
  const [prodArray, setProdArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  const [valueSend, setValueSend] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [filterArray, setFilterArray] = useState([]);
  // const[username, setUserName] = useState(localStorage.getItem("UserLogin").toUpperCase())
  const[username, setUserName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => {
        setProdArray(res.data);
      })
      .catch((error) => {
        alert(error.message);
      });

      setBtnClick(false);
      // setCartArray([])

      if(!localStorage.getItem("UserLogin")){
        navigate("/error")
      }
      else{
        setUserName(localStorage.getItem("UserLogin").toUpperCase())
      }

  }, []);

  useEffect(()=>{
    setValueSend(searchInput);
}, [searchInput])

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setSearchInput([name]=value);
    setBtnClick(false);
}

const handleSubmit = ()=>{
    if(valueSend.length!=0 && !btnClick){
        const farray = prodArray.filter((res)=>{
          return res.productname.toLowerCase() === valueSend.toLowerCase() || res.productcategory.toLowerCase() === valueSend.toLowerCase()
        })
        setFilterArray(farray);
        setBtnClick(true);
        setSearchInput("");
    }
    else{
        alert("Please provide value in search field...");
        setBtnClick(false);
    }
}

const logout = ()=>{
  localStorage.removeItem("UserLogin");
  navigate("/login")
}

const addItem = (elem)=>{
  let obj ={
    "itemid":elem.id,
    "itemname":elem.productname,
    "itemimage":elem.productimage,
    "itemprice":elem.productprice,
    "itemquantity":1
  }
  counter = counter+1

  cartArray.push(obj)
  setCartCount(counter)
  obj={}
}

const cartIcon = ()=>{
  if(counter!=0){
    localStorage.setItem("CartArray", JSON.stringify(cartArray))
    navigate("/cart")
  }
  else{
    alert("Cart is empty...")
  }
}
  return (
    <>
      <div className="user-container">
        <div className="sec-heading">
          <div className="top-div">
            <h1>HELLO {username} ! WELCOME TO THE DASHBOARD</h1>
          </div>
          <div className="below-div">
            <span>
              <i className="fa fa-sign-out logout" aria-hidden="true" onClick={logout}></i>
            </span>
            <span className="sec-mycart">
              <p className="item-count">{cartCount}</p>
              <i className="fa fa-shopping-cart mycart" aria-hidden="true" onClick={()=>cartIcon()}></i>
            </span>
            <button type="button" onClick={()=>{navigate("/vieworders")}}>View Orders <i className="fa fa-eye"></i></button>
          </div>
        </div>
        <div className="sec-product-array">
          <h1>EXPLORE OUR COLLECTION</h1>
          <div className="input-div">
            <input type="text" placeholder="Search Book by Name or Category"
            id="searchvalue" name="searchvalue" value={valueSend} onChange={handleInput}></input>
            <div className="search-icon">
              <i className="fa fa-search" aria-hidden="true" onClick={handleSubmit}></i>
            </div>
          </div>
        </div>
        <div className="product-array">
            {!btnClick &&
                    prodArray.map((curElem)=>{
                        return (
                            <>
                                <div className="card" key={curElem.id}>
                                    <div className="card-left">
                                        <img src={curElem.productimage}/>
                                    </div>
                                    <div className="card-right">
                                        <h1>{curElem.productname}</h1>
                                        <div className="item-rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i><span>({Math.floor((Math.random()*10000)+1).toString()})</span>
                                        </div>
                                        <p>{curElem.productdescription}</p>
                                        <p name="price">${curElem.productprice}</p>
                                        <button type="button" onClick={()=>addItem(curElem)}>Add To Cart 👍</button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
                {
                  btnClick && 
                    filterArray.map((curElem)=>{
                      return (
                          <>
                              <div className="card" key={curElem.id}>
                                  <div className="card-left">
                                      <img src={curElem.productimage}/>
                                  </div>
                                  <div className="card-right">
                                      <h1>{curElem.productname}</h1>
                                      <div className="item-rating">
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i><span>({Math.floor((Math.random()*10000)+1).toString()})</span>
                                      </div>
                                      <p>{curElem.productdescription}</p>
                                      <p name="price">${curElem.productprice}</p>
                                      <button type="button" onClick={()=>addItem(curElem)}>Add To Cart 👍</button>
                                  </div>
                              </div>
                          </>
                      )
                  })
                  }
          </div>
      </div>
    </>
  );
};

export default UserDashboard;
