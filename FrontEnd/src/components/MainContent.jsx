import React from "react";
import Navbar from "./Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import ScollCom from "./ScrollCom";
import ExpandingTextField from "./ExpandingTextField";
import { useState } from "react";
import Message from "./Message";
import "./css/MainContent.css";
import Alert from '@mui/material/Alert';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function MainContent() {
    const [messages, setMessages] = useState([]);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    let id = 0;

    function handleMessageSend(messageText) {
        const newMessage = (
            <Message message={messageText} title="HeathBot" key={id} />
        );
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        id++;
        console.log(messages);
    }

    async function handleLogout(){
        try {
            await logout();
            setError('');
            navigate('/');
        } catch(error) {
            setError("Logout failed: " + error.message);
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Navbar handleLogout={handleLogout}/>
            <div style={{ height: "100%" }}>
                <Grid container style={{ width: "100%", height: "100%" }}>
                {error && <Alert severity="error">{error}</Alert>}
                    {/* ************** History Gride ************** */}
                    <Grid xs={2} className="HistoryGrid">
                        <h1 style={{ color: "white" }}></h1>
                        <h1 style={{ color: "white" }}></h1>
                    </Grid>

                    {/* ************** Chat Gride ************** */}
                    <Grid xs={10} className="ChatGride">
                        <div className="message">
                            <ScollCom dicution={messages} />
                        </div>
                        <div className="textField">
                            <ExpandingTextField onMessagesend={handleMessageSend} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
