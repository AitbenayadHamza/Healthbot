import "./App.css";
import Navbar from "./componants/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import ScollCom from "./componants/ScrollCom";
import ExpandingTextField from "./componants/ExpandingTextField";
import { useState } from "react";
import Message from "./componants/Message";

function App() {
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
          <Grid
            xs={2}
            style={{
              paddingTop: "100px",
              backgroundColor: "#12372A",
              paddingLeft: "20px",
              boxShadow: "0.5px 0.5px 20px 0.5px black"
            }}
          >
            <h1 style={{ color: "white" }}></h1>
            <h1 style={{ color: "white" }}></h1>
          </Grid>

          <Grid
            xs={10}
            style={{
              backgroundColor: "#436850",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex", justifyContent: "center" , alignItems:"center",
                height: "88%",
                width:"100%",
              }}
            >
              <ScollCom dicution={messages}/>
            </div>
            <div style={{ display: "flex", justifyContent: "center" , height:"12%"}}>
              <ExpandingTextField onMessagesend={handleMessageSend} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
