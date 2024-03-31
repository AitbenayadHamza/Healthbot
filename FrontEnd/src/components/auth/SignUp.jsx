import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme } from '@mui/material/styles';
import { useAuth } from "../../../context/AuthContext";
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  const [showPasswordCom, setShowPasswordCom] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const togglePasswordComVisibility = () => {
    setShowPasswordCom(prevShowPassword => !prevShowPassword);
  };

  const { signup } = useAuth();
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='background'>
        <div className='contain'>
          <Container component="main" style={{ width: "80%" }}>
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
              <h2 style={{ color: "black" }}>Sign Up</h2>
              {error && <Alert severity="error">{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  color='white'
                  InputProps={{ style: { color: "black" } }}
                  inputRef={emailRef}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  color='white'
                  type={showPassword ? "text" : "password"}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type={showPasswordCom ? "text" : "password"}
                  id="passwordConfirmation"
                  color='white'
                  inputRef={passwordConfirmRef}
                  autoComplete="current-password"
                  InputProps={{
                    style: { color: "black" },
                    endAdornment: (
                      <Button onClick={togglePasswordComVisibility} style={{ color: "black" }}>
                        {showPasswordCom ? <Visibility /> : <VisibilityOff />}
                      </Button>
                    )
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  color="white"
                  style={{ color: loading ? 'black' : 'white' }}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <p style={{ color: "black" }}>Already have an account?<NavLink to="/signin" style={{ color: "black", fontWeight: "700", textDecoration: "none" }} > SignIn</NavLink></p>
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
