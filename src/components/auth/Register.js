import React, { useState, useEffect } from 'react'
import { Link, Prompt } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { object, string, ref } from 'yup'
import Button from 'react-bootstrap/Button'
import Input from '../layout/Input'
import FormikDirtyEffect from '../layout/FormikDirtyEffect'

const Register = () => {
  const [isDirty, setDirty] = useState(false)
  useEffect(() => {
    window.onbeforeunload = isDirty ? () => true : undefined
  })
  return (
    <div className='register'>
      <Prompt
        when={isDirty}
        message='You have unsaved changes, are you sure you want to leave?'
      />
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
            .required('Required')
            .test(
              'limitedTo',
              'Can only contain ASCII characters',
              (val) => !/[^ -~]/.test(val),
            )
            .test(
              'mixOf',
              'Must be a mix of letters, numbers, & special characters',
              (val) =>
                /\d/.test(val) &&
                /[ -/:-@[-`{-~]/.test(val) &&
                /[A-Za-z]/.test(val),
            ),
          confirm: string()
            .oneOf([ref('password'), null], 'Passwords must match')
            .required('Required'),
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
            <FormikDirtyEffect onDirtyChange={(dirty) => setDirty(dirty)} />
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
              type='submit'
              disabled={formik.isSubmitting}>
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
