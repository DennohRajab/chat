import { Input } from "@mui/material";
import React from "react";
const SigningUp = () => {
    return (
       <body>
        <div>
        <h2>Sign Up</h2>
        <h4> Fill in the reqired spaces</h4>
        <form>
            <label>First name</label>
            <input type ="text" placeholder=""/>
            <label>Last name</label>
            <input type ="text" placeholder=""/>
            <label>Email</label>
            <input type ="text" placeholder=""/>
            <label>Password</label>
            <input type ="text" placeholder=""/>
            <label>Confirm password</label>
            <input type ="text" placeholder=""/>
        </form>
        </div>
            </body>

    )
};
export default SigningUp;