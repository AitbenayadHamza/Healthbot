import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';


export default function Message({ message, title }) {

    const TypingText = ({ text }) => {
        const [displayText, setDisplayText] = useState('');

        useEffect(() => {
            const interval = setInterval(() => {
                if (displayText.length < text.length) {
                    setDisplayText(text.substring(0, displayText.length + 1));
                } else {
                    clearInterval(interval);
                }
            }, 20); // Adjust speed of typing here (milliseconds)
            return () => clearInterval(interval);
        }, [displayText, text]);

        return <span>{displayText}</span>;
    };

    return (
        <div style={{ width: "950px" }}>
            <Card sx={{ backgroundColor: "#D2E3C8", color: "balck", boxShadow: "0px 0px 0px 0px" }}>
                <CardHeader
                    avatar={
                        <div aria-label="recipe">
                            {title === 'HeathBot' && <svg fill="black" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width={"40px"}>
                                <g id="SVGRepo_iconCarrier">
                                    <title>health</title>
                                    <path d="m14,18.184v-4.184h-5.021v4.277c.595.346,1,.984,1,1.723,0,1.105-.895,2-2,2s-2-.895-2-2c0-.738.405-1.376,1-1.723v-4.275c-2.747.012-4.979,2.248-4.979,4.998v5h10v-3c0-1.302.839-2.402,2-2.816Zm3-4.184h-1v4.184c1.161.414,2,1.514,2,2.816v3h4v-5c0-2.757-2.243-5-5-5Zm-2,6c-.552,0-1,.448-1,1v3h2v-3c0-.552-.448-1-1-1Zm-2.979-8c-3.309,0-6-2.691-6-6S8.713,0,12.021,0s6,2.691,6,6-2.691,6-6,6Zm0-9c-1.654,0-3,1.346-3,3s1.346,3,3,3,3-1.346,3-3-1.346-3-3-3Z">
                                    </path>
                                </g>
                            </svg>}

                        </div>
                    }
                    title={<h3>{title}:</h3>}
                
                />
                <CardContent>
                    <Typography variant="subtitle2" color="balck" style={{ width: "100%", fontSize: "16px", whiteSpace: "pre-line" }}>
                        {/* {title === 'HeathBot' ? <h5>HeathBot:</h5>:<h5>You:</h5>} */}
                        <TypingText text={message} />
                    </Typography>
                    <Divider style={{ marginTop: "40px", borderColor: "black", opacity: "0.1" }} />
                </CardContent>
            </Card>
        </div>
    );
}
