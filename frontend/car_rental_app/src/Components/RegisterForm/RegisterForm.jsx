import React from "react";
import './RegisterForm.css'
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";



const RegisterForm = () => {

return(


<div>
<div className="wrapper">
    <form action ="">
        <h1>Register</h1>
        <div className="input-box">
            <input type="text" placeholder="Name" required />
            <FaUser className="icon"/>
        </div>

        <div className="input-box">
            <input type="text" placeholder="email" required />
            <CiMail className="icon"/>

        </div>
        <div className="input-box">
            <input type="text" placeholder="Password" required />
            <CiLock className="icon"/>

        </div>

        <button type="submit">Register</button>


    </form>
</div>

</div>
);

};

export default RegisterForm