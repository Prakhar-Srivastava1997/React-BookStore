import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ComponentCSS/OrderCSS.css";
import { useNavigate } from "react-router-dom";

const ViewOrders = ()=>{

    const [orderList, setOrderList]=useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/orders").then((res)=>{
            setOrderList(res.data)
        }).catch((error)=>{
            alert(error.message)
        })

        if(!localStorage.getItem("UserLogin")){
            navigate("/error")
        }
    }, [])
    return (
        <>
            <div className="container">
                <div className="heading">Orders Made So Far...</div>
                <div className="ordercontainer">
                    {
                        orderList.map((curelem)=>{
                            return (
                                <>
                                    <div className="order-card" key={curelem.orderid}>
                                        <div className="orderid">
                                            <div><p>ORDER ID#</p></div>
                                            <div><p name="meta-data">{curelem.orderid}</p></div>
                                        </div>
                                        <div className="orderdetail">
                                            <p>BOOKS ORDERED</p>
                                            <p>{curelem.orderdetail.map((res)=>{
                                                return(
                                                    <>
                                                        <p name="meta-data">{res}</p>
                                                    </>
                                                )
                                            })}</p>
                                        </div>
                                        <div className="orderquantity">
                                            <p>ORDER QUANTITY</p>
                                            <p name="meta-data">{curelem.orderquantity}</p>
                                        </div>
                                        <div className="orderprice">
                                            <p>TOTAL AMOUNT</p>
                                            <p name="meta-data">${curelem.orderprice}</p>
                                        </div>
                                        <div className="orderdate">
                                            <p>ORDER DATE</p>
                                            <p name="meta-data">{curelem.orderdate}</p>
                                        </div>
                                        
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ViewOrders;