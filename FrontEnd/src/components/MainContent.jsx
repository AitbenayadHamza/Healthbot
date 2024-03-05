import React from "react";
import Navbar from "./Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import ScollCom from "./ScrollCom";
import ExpandingTextField from "./ExpandingTextField";
import { useState } from "react";
import Message from "./Message";
import "./css/MainContent.css"

export default function MainContent() {
    const [messages, setMessages] = useState([]);

    let id = 0;

    function handleMessageSend(messageText) {
        const newMessage = (
            <Message message={messageText} title="HeathBot" key={id} />
        );
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        id++;
        console.log(messages);
    }
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Navbar />
            <div style={{ height: "100%" }}>
                <Grid container style={{ width: "100%", height: "100%" }}>

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
