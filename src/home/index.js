import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Api } from "../helper";
import Date from "moment"
import moment from "moment";
export default function Home() {
    const [state, setState] = useState({
        users: [], 
        typedMessage: '',
        sentMessages: [],
        peer: null,

    });

    const { users, typedMessage, sentMessages, peer } = state;
    const messageContainerRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the message container
        //learn more on useRef()
        //ask brian

        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [sentMessages]);
    const getUsers = () => {
        Api({
            action: "getUsers",
        }).then((users) => {
            console.log({ users });
            setState({
                ...state,
                users,
                peer: users[0]
            });
        });
    };
    useEffect(() => {
        // I want to get users
        getUsers();
        return () => { };
    }, []);
    return (
        <div
            style={{
                height: 500,
                width: 1000,
                boxShadow: "1px 2px 1px grey",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <div>
                <List>
                    {users.map((user) => {
                        return (
                            <ListItem onClick={() => {
                                setState({
                                    ...state,
                                    peer: user
                                })
                            }}>
                                <Avatar />
                                <Typography>{user.username}</Typography>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <div
                style={{
                    backgroundColor: "grey",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        // width:500,
                        // height:50,
                        backgroundColor: "red",
                    }}
                >
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 3,


                    }}>
                        <Avatar />
                        <Box sx={{
                            marginLeft: 2
                        }}>
                            <Typography sx={{
                                fontSize: 15
                            }}>{peer?.username}
                            </Typography>
                            <Typography sx={{
                                fontSize: 12,
                                fontStyle: "italic"
                            }}>{peer?.status}</Typography>
                        </Box>
                    </div>

                    <div
                        ref={messageContainerRef}
                        style={{
                            overflowX: "hidden",
                            height: 400,
                            width: 1000,
                            backgroundColor: "#abdbe3",



                        }}
                    >
                        {sentMessages.map((message, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        padding: 10,
                                        backgroundColor: "green",
                                        borderRadius: 10,
                                        width: 600,
                                        marginBottom: 5,
                                        marginLeft: 5,
                                        marginTop: 5,
                                        flexDirection: "column",
                                        wordWrap: "break-word",
                                        scrollBehavior: "smooth"

                                    }}>
                                    <Typography sx={{
                                        color: '#ffff'

                                    }}

                                    >{message.txt}</Typography>
                                    <span style={{
                                        fontSize: 10,
                                        marginLeft: 550,
                                        color: "#ffff"


                                    }}> {moment(message.date).format("YYYY HH:mm")}</span>

                                </div>
                            )
                        })}

                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: "center"
                    }}>
                        <TextField sx={{
                            width: 800
                        }}
                            placeholder="Type message"
                            onChange={(e) => {
                                let { value } = e.target;
                                setState({
                                    ...state, typedMessage: value,

                                });
                            }}
                            value={typedMessage}

                        />
                        <Button sx={{
                            marginLeft: 10
                        }}
                            disabled={!typedMessage}

                            variant="contained"
                            onClick={() => {

                                setState({
                                    ...state, sentMessages: [...sentMessages,
                                    {
                                        txt: typedMessage,
                                        date: new Date()
                                    }
                                    ],
                                    typedMessage: ''
                                })


                            }}

                        >Send</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}
