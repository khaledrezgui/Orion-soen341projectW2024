import React from "react";
import './LoginForm.css'
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";


const LoginForm = () => {

return(

<div>
<div className="wrapper">
    <form action ="">
        <h1>Login</h1>
        <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon"/>
        </div>

        <div className="input-box">
            <input type="text" placeholder="Password" required />
            <CiLock className="icon"/>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
            <p>Dont have an account? <a href="/register">Register</a></p>
        </div>
    </form>
</div>

</div>
);

};

export default LoginForm