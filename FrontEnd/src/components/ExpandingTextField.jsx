import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        ochre: {
            main: "rgb(0,0,0,0.2)",
        },
        ochre2: {
            main: "rgb(0,0,0)",
        },
        ochre3: {
            main: "#035b3e",
        },
    },
});

function ExpandingTextField({ onMessagesend }) {
    const [textvalue, settextvalue] = useState("");

    function handleChange(e) {
        settextvalue(e.target.value);
    }

    function handleClick() {
        onMessagesend(textvalue);
        settextvalue("");
    }

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "75%",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        transition: "transform 0.3s ease",
                        zIndex: 1,
                        width: "100%",
                    }}
                >
                    <TextField
                        value={textvalue}
                        onChange={handleChange}
                        multiline
                        label=""
                        id="fullWidth"
                        maxRows={2}
                        color="ochre2"
                        placeholder="What is your question today?"
                        style={{ width: "99%" }}
                        InputProps={{
                            style: {                            
                                borderColor: "red",
                                color: "black",
                                borderRadius: "15px",
                            },
                        }}
                    />
                </div>
                <div>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClick();
                        }}
                        color="ochre2"
                        style={{ padding: "15px", borderRadius: "15px" }}
                        disabled={textvalue === ""}
                    >
                        <SendIcon />
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default ExpandingTextField;
