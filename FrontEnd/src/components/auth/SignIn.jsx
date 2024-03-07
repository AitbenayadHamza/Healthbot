import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme } from '@mui/material/styles';
import { useAuth } from "../../../context/AuthContext";
import "../css/auth.css"
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        ochre: {
            main: "rgb(255,255,255,0.2)",
        },
        white: {
            main: "rgb(250,250,250)",
            light: "#rgb(255,255,255)",
            dark: "#rgb(100,100,100)",
        },
    },
});


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const { signin } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate('/'); 
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
                            <h2 style={{ textAlign: "center", color: "white" }}>Sign in</h2>
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
                                    InputProps={{ style: { color: "white" } }}
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
                                    focused
                                    InputProps={{
                                        style: { color: "white" },
                                        endAdornment: (
                                            <Button onClick={togglePasswordVisibility} style={{ color: "white" }}>
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
                                    style={{color: loading ? 'white' : 'black' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2" color={theme.palette.background.default}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2" color={theme.palette.background.default}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
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
