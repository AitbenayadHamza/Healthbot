import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
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
            setError('Failed to create an Sign In: ' + error.message);
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
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar src="/broken-image.jpg" />
                            <h2 style={{ textAlign: "center", color: "black" }}>Sign in</h2>
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
