import React, { Component } from 'react'
import SignIn from './SignIn'
import Register from './Register'

function Auth (props) {
  const [accessToken, setAccessToken] = React.useState(localStorage.getItem('accessToken'));
  const [type, setType] = React.useState('Login'); // Login | Register

  if (accessToken) {
    return props.children
  } else {
    return (
      type === 'Login' ? <SignIn setAccessToken={setAccessToken} setType={setType} /> : <Register setAccessToken={setAccessToken} setType={setType} />
    )
  }
}

export default Auth

