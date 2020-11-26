import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Input from '../layout/Input'

const About = () => {
  return (
    <div className='about'>
      <h1 className='display-5 mb-1'>About</h1>
      <a
        href='https://vimalpa.tel'
        target='_blank'
        rel='noopener noreferrer'
        className='link--accented'>
        Developer: Vimal Patel
        <i className='fas fa-external-link-alt fa-sm ml-1' />
      </a>
      <hr className='hr ml-0' />

      <h3 className='display-6'>Write to me</h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={object({
          name: string()
            .max(31, "Mustn't exceed 31 characters")
            .required('Required'),
          email: string().email('Invalid email').required('Required'),
          message: string().required('Required'),
        })}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log(values)
        }}>
        {(formik) => (
          <Form noValidate className='form mt-3' onSubmit={formik.handleSubmit}>
            <Input
              label='Name'
              name='name'
              type='text'
              placeholder="What's your name?"
            />
            <Input
              label='Email address'
              name='email'
              type='email'
              placeholder="What's your email?"
              autoComplete='username'
            />
            <Input
              as='textarea'
              label='Message'
              name='message'
              type='text'
              placeholder='What do you have to say?'
            />
            <Button
              variant='outline-danger'
              type='submit'
              className='px-4 mt-2'
              disabled={formik.isSubmitting}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default About
