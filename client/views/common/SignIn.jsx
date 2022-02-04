import React, { Component } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function SignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch('http://localhost:4000/login', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password')        
      })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('accessToken', data.token)
      localStorage.setItem('accountId', data._id)
      props.setAccessToken(data.token)
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <CarRentalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => props.setType('Register')} variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn