import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Message({ message, title }) {
    return (
        <div style={{ width: "950px" }}>
            <Card sx={{ backgroundColor: "#436850", color: "white", boxShadow: "0px 0px 0px 0px" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: "#436850", color: "white" }} aria-label="recipe">
                            <svg fill="white" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#436850">
                                <g id="SVGRepo_iconCarrier">
                                    <title>health</title>
                                    <path d="M29.125 10.375h-7.5v-7.5c0-1.036-0.839-1.875-1.875-1.875h-7.5c-1.036 0-1.875 0.84-1.875 1.875v7.5h-7.5c-1.036 0-1.875 0.84-1.875 1.875v7.5c0 1.036 0.84 1.875 1.875 1.875h7.5v7.5c0 1.036 0.84 1.875 1.875 1.875h7.5c1.036 0 1.875-0.84 1.875-1.875v-7.5h7.5c1.035 0 1.875-0.839 1.875-1.875v-7.5c0-1.036-0.84-1.875-1.875-1.875z">
                                    </path>
                                </g>
                            </svg>
                        </Avatar>
                    }
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="subtitle2" color="white" style={{ width: "100%", fontSize: "16px", whiteSpace: "pre-line" }}>
                        {message}
                    </Typography>
                    <Divider style={{ marginTop: "40px", borderColor: "white", opacity: "0.4" }} />
                </CardContent>
            </Card>
        </div>
    );
}
