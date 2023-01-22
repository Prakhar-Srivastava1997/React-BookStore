import React from "react";
import "../ComponentCSS/ContactCSS.css";

const ContactUs = ()=>{
    return (
        <>
            <div className="container">
                <div className="contact-heading">
                    <h1>LET'S CONNECT</h1>
                </div>
                <div className="contact-options">
                    <div className="address">
                        <img src="./Images/address.jpg" alt="image"/>
                        <p>203 Johnson Ave,
                           Belle Vernon,
                           Pennsylvania,
                           15012.</p>
                    </div>
                    <div className="phone">
                        <img src="./Images/phone.jpg" alt="image"></img>
                        <p>(724) 929-9588</p>
                    </div>
                    <div className="email">
                        <img src="./Images/email.jpg"></img>
                        <p>abc#1234@gmail.com</p>
                    </div>
                    <div className="socialmedia">
                        <img src="./Images/socialmedia.jpg" alt="image"></img>
                        <div>
                            <span><i class="fa fa-facebook-f"></i></span>
                            <span><i class="fa fa-twitter"></i></span>
                            <span><i class="fa fa-instagram"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;