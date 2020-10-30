import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <Form className='form mt-3'>
        <Form.Group controlId='form__name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='name' placeholder="What's your name?" />
        </Form.Group>
        <Form.Group controlId='form__email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder="What's your email?" />
        </Form.Group>
        <Form.Group controlId='form__message'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            placeholder='What do you have to say?'
          />
        </Form.Group>

        <Button variant='outline-danger' type='submit' className='px-4 mt-2'>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default About
