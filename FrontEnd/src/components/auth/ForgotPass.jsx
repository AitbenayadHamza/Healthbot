import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import "../css/auth.css"
import Alert from '@mui/material/Alert';
import { NavLink } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../../../context/AuthContext';

const theme = createTheme({
    palette: {
        ochre: {
            main: "rgb(255,255,255,0.2)",
        },
        white: {
            main: "rgb(25,25,25)",
            light: "#rgb(255,255,255)",
            dark: "rgb(35,35,35,0.8)",
        },
    },
});



function ForgotPass() {

    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message , setMessage] = useState("")

    const emailRef = useRef();
    const { resetPassword } = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox to get new password")
        } catch (error) {
            setError('Failed to reset password');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='background'>
                <div className='contain'>
                    <Container component="main" style={{ width: "80%" }} >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <svg fill="black" viewBox="0 0 24 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width={"65px"}>
                                    <g id="SVGRepo_iconCarrier">
                                        <title>health</title>
                                        <path d="m14,18.184v-4.184h-5.021v4.277c.595.346,1,.984,1,1.723,0,1.105-.895,2-2,2s-2-.895-2-2c0-.738.405-1.376,1-1.723v-4.275c-2.747.012-4.979,2.248-4.979,4.998v5h10v-3c0-1.302.839-2.402,2-2.816Zm3-4.184h-1v4.184c1.161.414,2,1.514,2,2.816v3h4v-5c0-2.757-2.243-5-5-5Zm-2,6c-.552,0-1,.448-1,1v3h2v-3c0-.552-.448-1-1-1Zm-2.979-8c-3.309,0-6-2.691-6-6S8.713,0,12.021,0s6,2.691,6,6-2.691,6-6,6Zm0-9c-1.654,0-3,1.346-3,3s1.346,3,3,3,3-1.346,3-3-1.346-3-3-3Z">
                                        </path>
                                    </g>
                                </svg>
                            <h2 style={{ textAlign: "center", color: "black" }}>Reset Password</h2>
                            {Error && <Alert severity="error">{Error}</Alert>}
                            {message && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{message}</Alert>}
                            <Box component="form" onSubmit={handleSubmit} style={{width:"100%"}}>
                                <TextField
                                    margin="normal"
                                    type='email'
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    color='white'
                                    autoComplete="email"
                                    inputRef={emailRef}
                                    InputProps={{ style: { color: "black" } }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    color="white"
                                    style={{ color: loading ? 'black' : 'white' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    <NavLink to="/signin" style={{color:"black", fontWeight:"700" , textDecoration:"none"}} ><p>SignIn</p></NavLink>
                                    </Grid>
                                    <Grid item>
                                    <p style={{color:"black"}}>Don't have an account?<NavLink to="/signup" style={{color:"black", fontWeight:"700" , textDecoration:"none"}} > SignUp</NavLink></p>                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default ForgotPass