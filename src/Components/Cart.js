import React, { useEffect, useState } from "react";
import "../ComponentCSS/CartCSS.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"

var finalArray =[];
var CartArray=[]

const Cart = ()=>{
    const [cartItemArray, setCartItemArray]=useState([]);
    const [quantity, setQuantity] = useState(0)
    var grandTotal=0
    var orderArray=[]
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        setCartItemArray(JSON.parse(localStorage.getItem("CartArray")))
        CartArray = JSON.parse(localStorage.getItem("CartArray"))
        setQuantity(CartArray.length)

        if(!localStorage.getItem("UserLogin")){
            navigate("/error")
        }
    },[])
   
    const quantityInc = (data)=>{
        if(data.itemquantity<5){
            data.itemquantity = data.itemquantity+1
           setQuantity(quantity + 1)
           
        }
    }

    const quantityDesc = (data)=>{
        if(data.itemquantity>1){
            data.itemquantity = data.itemquantity-1
            setQuantity(quantity - 1)
             
        }
    }

    const deleteItem = (data)=>{
        finalArray = cartItemArray.filter((res)=>{
            return res.itemname != data.itemname
        })

        setCartItemArray(finalArray)
        localStorage.setItem("CartArray", JSON.stringify(finalArray))
    }

    const orderItem = ()=>{
        if(cartItemArray.length!=0){
            let orderObj = {
                "orderid":new Date().getTime().toString(),
                "orderdetail":orderArray,
                "orderquantity":quantity,
                "orderprice":grandTotal,
                "orderdate":new Date().toDateString()
            }
    
            axios.post("http://localhost:8000/orders", orderObj).then((res)=>{
                alert("Order placed successfully !!")
                navigate("/userdashboard")
                localStorage.removeItem("CartArray")
            }).catch((error)=>{
                alert(error.message)
            })
        }
        else{
            alert("Cart is empty....")
        }
    }


    return (
        <>
            <div className="container">
                <div className="heading">View Your Cart</div>
                <div className="cartcontainer">
                    {
                        cartItemArray.map((curelem)=>{
                            grandTotal = grandTotal + (+curelem.itemprice * curelem.itemquantity)
                            orderArray.push(curelem.itemname)
                            return (
                                <>
                                    <div className="item-card" key={curelem.itemid}>
                                        <div className="item-image">
                                            <img src={curelem.itemimage} alt="image"/>
                                        </div>
                                        <div className="item-name">
                                            <p>{curelem.itemname}</p>
                                        </div>
                                        <div className="item-quantity">
                                            <button type="button" onClick={()=>quantityInc(curelem)}>+</button>
                                            <input type="text" value={curelem.itemquantity} readOnly></input>
                                            <button type="button" onClick={()=>quantityDesc(curelem)}>-</button>
                                        </div>
                                        <div className="item-total">
                                            <p>${curelem.itemprice*curelem.itemquantity}</p>
                                            <span><i className="fa fa-trash" aria-hidden="true" onClick={()=>deleteItem(curelem)}></i></span>
                                        </div>
                                        
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="grand-total">
                    <h1>Order Summary</h1>
                    <hr/>
                    <h1>Sub-Total - ${grandTotal}</h1>
                    <h1>Grand-Total - ${grandTotal}</h1>
                    <hr/>
                    <button type="button" onClick={()=>orderItem()}>Order Now 👍</button>
                </div>
            </div>
        </>
    )
}

export default Cart;