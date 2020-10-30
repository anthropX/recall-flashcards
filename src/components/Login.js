import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  return (
    <div className='login'>
      <h1 className='display-5 mb-1'>Sign in</h1>
      <p>Enter your login details</p>
      <hr className='hr ml-0' />

      <Form className='login__form form'>
        <Form.Group controlId='form__email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder="What's your email?" />
        </Form.Group>
        <Form.Group controlId='form__password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter your password' />
        </Form.Group>

        <Button
          variant='outline-danger'
          type='submit'
          className='px-4 mt-2 mb-3'>
          Sign in
        </Button>
      </Form>

      <p>
        Don&apos;t have an account?{' '}
        <Link to='/register' className='link--accented'>
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
