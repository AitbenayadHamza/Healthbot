import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#E3D026",
            light: "#E9DB5D",
            dark: "#A29415",
            contrastText: "#242105",
        },
        ochre: {
            main: "rgb(255,255,255,0.2)",
        },
        ochre2: {
            main: "rgb(255,255,255)",
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
                        color="ochre"
                        focused
                        placeholder="What is your question today?"
                        style={{ width: "99%" }}
                        InputProps={{
                            style: {
                                textAlign: "top", // Align text to start from the top
                                borderColor: "red",
                                color: "white",
                                borderRadius: "15px",
                                "&:focus": {
                                    // Define styles for focused state
                                    borderColor: "red", // Change border color when focused
                                    boxShadow: "0 0 0 0.2rem rgba(163, 147, 21, 0.25)", // Add box shadow when focused
                                },
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
