import React from "react";
import ScollCom from "./ScrollCom";
import ExpandingTextField from "./ExpandingTextField";
import { useState } from "react";
import Message from "./Message";
import "./css/MainContent.css";
import Alert from '@mui/material/Alert';
import { useAuth } from "../../context/AuthContext";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';


export default function MainContent() {

    const [messages, setMessages] = useState([]);
    const [history, sethistory] = useState([]);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [userMessageId, setUserMessageId] = useState(0);
    const [botMessageId, setBotMessageId] = useState(0);
    const userName = currentUser.email.split('@')[0];
    const sendMessage = async (message) => {
        try {
            const response = await fetch('http://localhost:5000/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const responseData = await response.json();
            return responseData.response;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMessageSend = async (messageText) => {
        try {
            const newMessage = <Message message={messageText} title="You" key={`user-${userMessageId}`} />;
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setUserMessageId(prevId => prevId + 1);

            const chatbotResponse = await sendMessage(messageText);
            const botMessage = <Message message={chatbotResponse} title="HealthBot" key={`bot-${botMessageId}`} />;
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setBotMessageId(prevId => prevId + 1);
        } catch (error) {
            setError("Failed to send message: " + error.message);
        }
    };


    async function handleLogout() {
        try {
            await logout();
            setError('');
            navigate('/');
        } catch (error) {
            setError("Logout failed: " + error.message);
        }
    }

    function handleNewchat() {
        const newChatEntry = {
            id: Date.now(),
            messages: messages
        };
        if (newChatEntry.messages.length !== 0 && newChatEntry.messages.length !== null) {
            sethistory([...history, newChatEntry]);
        }
        setMessages([]);
    }


    function handleHistory(index) {
        setMessages(history[index].messages)
    }

    function handleDelete(indexToDelete) {
    sethistory(prevHistory => {
        // Filter out the history entry at the specified index
        const updatedHistory = prevHistory.filter((entry, index) => index !== indexToDelete);
        return updatedHistory;
    });
}


    return (
        <div style={{ width: "100%", height: "100%" }}>
            {/* <Navbar handleLogout={handleLogout} /> */}
            <div style={{ height: "100%" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#000000e6", display: "flex", flexDirection: "row" }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    {/* ************** History Gride ************** */}
                    <div className="HistoryGrid">
                        <div>
                            <div style={{ display: "flex" }}>
                                <svg fill="white" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width={"45px"}>
                                    <g id="SVGRepo_iconCarrier">
                                        <title>health</title>
                                        <path d="m14,18.184v-4.184h-5.021v4.277c.595.346,1,.984,1,1.723,0,1.105-.895,2-2,2s-2-.895-2-2c0-.738.405-1.376,1-1.723v-4.275c-2.747.012-4.979,2.248-4.979,4.998v5h10v-3c0-1.302.839-2.402,2-2.816Zm3-4.184h-1v4.184c1.161.414,2,1.514,2,2.816v3h4v-5c0-2.757-2.243-5-5-5Zm-2,6c-.552,0-1,.448-1,1v3h2v-3c0-.552-.448-1-1-1Zm-2.979-8c-3.309,0-6-2.691-6-6S8.713,0,12.021,0s6,2.691,6,6-2.691,6-6,6Zm0-9c-1.654,0-3,1.346-3,3s1.346,3,3,3,3-1.346,3-3-1.346-3-3-3Z">
                                        </path>
                                    </g>
                                </svg>
                                <h1>HealthBot</h1>
                            </div >
                            <Button variant="outlined" fullWidth onClick={handleNewchat} color="success">New Chat</Button>
                            <div style={{ display: "flex", marginTop: '5px', justifyContent: "center", flexDirection: "column" }}>
                                <h2>Historys</h2>
                                {history.map((discution, index) => {
                                    return <Chip
                                        key={index}
                                        color="success"
                                        label={`History ${index + 1}`}
                                        onClick={() => { handleHistory(index) }}
                                        onDelete={() => { handleDelete(index) }}
                                        deleteIcon={<DeleteIcon />}
                                        variant="outlined"
                                        style={{ justifyContent: "space-between",marginBottom:"5px" }}
                                    />
                                })}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Chip
                                avatar={<Avatar alt={userName[0].toUpperCase()} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />}
                                label={userName}
                                variant="outlined"
                                color="success"
                                sx={{padding:"12px",marginBottom:"5px",fontSize:"18px",width:"100%",height:"40px",justifyContent:"space-around"}}
                            />
                            <button className="logoutButton" onClick={handleLogout}><LogoutRoundedIcon /> <div>LOGOUT</div></button>
                        </div>
                    </div>

                    {/* ************** Chat Gride ************** */}
                    <div className="ChatGride">
                        <div className="navbar" style={{ margin: "7px" }}></div>
                        <div className="message">
                            <ScollCom dicution={messages} />
                        </div>
                        <div className="textField">
                            <ExpandingTextField onMessagesend={handleMessageSend} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
