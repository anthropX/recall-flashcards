import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
  return (
    <div className='register text-dark'>
      <h1 className='display-5 mb-1'>Register</h1>
      <p>Please enter details for registration</p>

      <Form className='register__form form'>
        <div className='d-flex'>
          <Form.Group controlId='form__first' className='flex-grow-1 mr-4'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' placeholder='Your first name' size='sm' />
          </Form.Group>
          <Form.Group controlId='form__last' className='flex-grow-1'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' placeholder='Your last name' size='sm' />
          </Form.Group>
        </div>
        <Form.Group controlId='form__email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder="What's your email?"
            size='sm'
          />
        </Form.Group>
        <Form.Group controlId='form__password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter a password'
            size='sm'
          />
        </Form.Group>
        <Form.Group controlId='form__confirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter the password again'
            size='sm'
          />
        </Form.Group>
        <Button
          variant='outline-danger'
          type='submit'
          className='px-4 mt-2 mb-3'>
          Sign up
        </Button>
      </Form>
      <p>
        Don&apos;t have an account?{' '}
        <Link to='/login' className='link--accented text-dark'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register
