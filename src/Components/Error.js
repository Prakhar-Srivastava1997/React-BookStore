import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentCSS/ErrorCSS.css";

const Error = ()=>{

    const navigate = useNavigate()
    return (
        <>
        <div className="error-container">
            <button type="button" onClick={()=>navigate("/")} className="error-btn">Go Back</button>
        </div>
        </>
    )
}

export default Error;