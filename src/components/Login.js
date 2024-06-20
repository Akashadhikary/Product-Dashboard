import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    if (username === 'admin' && password === 'password') {
      dispatch(loginSuccess({ username }));
      navigate('/dashboard');
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
