import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Input from '../layout/Input'

const Login = () => {
  return (
    <div className='login'>
      <h1 className='display-5 mb-1'>Sign in</h1>
      <p>Enter your login details</p>
      <hr className='hr ml-0' />

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={object({
          email: string().email('Invalid email').required('Required'),
          password: string().required('Required'),
        })}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log(values)
        }}>
        {(formik) => (
          <Form
            noValidate
            className='register__form form'
            onSubmit={formik.handleSubmit}>
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
            <Button
              className='px-4 mt-2 mb-3'
              variant='outline-danger'
              type='submit'
              disabled={formik.isSubmitting}>
              Sign in
            </Button>
          </Form>
        )}
      </Formik>

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
