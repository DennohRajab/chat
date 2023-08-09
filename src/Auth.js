import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
const Auth = () => {
    const [state, setState] = useState({
        currentPage: 'Sign Up',
    })
    const { currentPage } = state;
    const submit = (c) => {
        c.preventDefault()
        let data = {}

        let formData = new FormData(c.target)

        formData.forEach((v, k) => data[k] = v)


        axios.post('http://localhost:3001', JSON.stringify(data), {
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }).then(() => {

        }).catch(() => {

        })

        console.log({ data })
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                width: 300,
                margin: 500,
                alignItems: "center",
                marginTop: 5
            }}
        >
            <h2>{currentPage}</h2>
            <form onSubmit={submit}>
                <TextField
                    label={
                        currentPage === 'Sign in' ? "Email or Username" : "Email"}
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    sx={{
                        marginBottom: 2
                    }} />
                {
                    currentPage === 'Sign up' ?
                        <TextField
                            name="username"
                            required
                            label="Username"
                            placeholder="username"
                            sx={{
                                marginBottom: 2
                            }} /> : null
                }

                <TextField
                    name="password"
                    type="password"
                    required
                    label="Password"
                    placeholder="Password"
                    sx={{
                        marginBottom: 2
                    }} /><br />
                <Button sx={{
                    marginBottom: 2
                }}
                    type="submit"
                    variant="contained">{currentPage}
                </Button><br />
                <Button
                    style={{
                        textTransform: 'none'
                    }}
                    onClick={() => {
                        setState({
                            ...state,
                            currentPage: currentPage === 'Sign in' ? 'Sign up' : 'Sign in'
                        })
                    }}>
                    {currentPage === 'Sign in' ? ' Do not have an account? Sign Up' : 'Already have an account? Sign In'}
                </Button>
            </form>
        </div>

    )
}

export default Auth;

