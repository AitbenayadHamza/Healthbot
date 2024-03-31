import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme } from '@mui/material/styles';
import { useAuth } from "../../../context/AuthContext";
import "../css/auth.css"
import Alert from '@mui/material/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

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


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const { signin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const emailRef = useRef();
    const passwordRef = useRef();

    const redirectpath = location.state?.path || "/";

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate(redirectpath,{replace:true});
        } catch (error) {
            setError('Oops! It seems there was an issue signing in. Please check your email and password');
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
                                marginTop: 2,
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
                            <h2 style={{color: "black" }}>Sign In</h2>
                            {Error && <Alert severity="error">{Error}</Alert>}
                            <Box component="form" onSubmit={handleSubmit}>
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    color='white'
                                    inputRef={passwordRef}
                                    InputProps={{
                                        style: { color: "black" },
                                        endAdornment: (
                                            <Button onClick={togglePasswordVisibility} style={{ color: "black" }}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </Button>
                                        )
                                    }}
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
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <NavLink to="/resetpassword" style={{color:"black",fontWeight:"600",textDecoration:"none"}}><p>Forgot password?</p></NavLink>
                                    </Grid>
                                    <Grid item>
                                        <p style={{color:"black"}}>Don't have an account?<NavLink to="/signup" style={{color:"black", fontWeight:"700" , textDecoration:"none"}} > SignUp</NavLink></p>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SignUp;
