import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
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
      main: "rgb(250,250,250)",
      light: "#rgb(255,255,255)",
      dark: "rgb(150,150,150,0.9)",
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
              <Avatar src="/broken-image.jpg" />
              <h2 style={{ textAlign: "center", color: "white" }}>Sign Up</h2>
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
                  InputProps={{ style: { color: "white" } }}
                  focused
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
                  focused
                  inputRef={passwordRef}
                  InputProps={{
                    style: { color: "white" },
                    endAdornment: (
                      <Button onClick={togglePasswordVisibility} style={{ color: "white" }}>
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
                  focused
                  inputRef={passwordConfirmRef}
                  autoComplete="current-password"
                  InputProps={{
                    style: { color: "white" },
                    endAdornment: (
                      <Button onClick={togglePasswordComVisibility} style={{ color: "white" }}>
                        {showPasswordCom ? <Visibility /> : <VisibilityOff />}
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
                  style={{ color: loading ? 'white' : 'black' }}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
                <Grid container>
                    <Grid item xs>
                          </Grid>
                              <Grid item>
                              <p style={{color:"white"}}>Already have an account?<NavLink to="/signin" style={{color:"#03c27f", fontWeight:"400" , textDecoration:"none"}} > SignIn</NavLink></p>
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
