import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { object, string, ref } from 'yup'
import Button from 'react-bootstrap/Button'
import Input from '../layout/Input'

const Register = () => {
  return (
    <div className='register'>
      <h1 className='display-5 mb-1'>Register</h1>
      <p>Please enter details for registration</p>
      <hr className='hr ml-0' />

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirm: '',
        }}
        validationSchema={object({
          firstName: string()
            .max(15, "Mustn't exceed 15 characters")
            .required('Required'),
          lastName: string()
            .max(15, "Mustn't exceed 15 characters")
            .required('Required'),
          email: string().email('Invalid email').required('Required'),
          password: string()
            .min(6, 'Password must have atleast 6 characters')
            .required('Required'),
          confirm: string()
            .oneOf([ref('password'), null], 'Passwords must match')
            .required('Required'),
        })}
        onSubmit={(values) => console.log(values)}>
        {(formik) => (
          <Form
            noValidate
            className='register__form form'
            onSubmit={formik.handleSubmit}>
            <div className='d-flex'>
              <Input
                className='w-50 mr-4'
                label='First Name'
                name='firstName'
                type='text'
                placeholder='Your first name'
              />
              <Input
                className='w-50'
                label='Last Name'
                name='lastName'
                type='text'
                placeholder='Your last name'
              />
            </div>
            <Input
              label='Email address'
              name='email'
              type='email'
              placeholder="What's your email?"
              autoComplete='username'
            />
            <Input
              label='Password'
              name='password'
              type='password'
              placeholder='Enter a password'
              autoComplete='new-password'
            />
            <Input
              label='Confirm Password'
              name='confirm'
              type='password'
              placeholder='Enter the password again'
              autoComplete='new-password'
            />
            <Button
              className='px-4 mt-2 mb-3'
              variant='outline-danger'
              type='submit'>
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
      <p>
        Don&apos;t have an account?{' '}
        <Link to='/login' className='link--accented'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register
