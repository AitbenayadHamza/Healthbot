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
                            <Avatar src="/broken-image.jpg" />
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