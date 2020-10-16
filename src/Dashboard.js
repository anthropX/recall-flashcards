import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Dashboard() {
  return (
    <div className='dashboard'>
      <Container className='text-light'>
        <h1 className='dashboard__heading display-4 pt-5 mb-0'>
          <span className='accented'>Recall </span> flashcards
        </h1>
        <p className='dashboard__text lead w-75 mb-4'>
          Create flashcards for free! Break down your study material into small
          digestible bits of information. Learn until you reach mastery. No ads
          whatsoever for full immersive learning.
        </p>
        <Button variant='danger'>Get Started</Button>
      </Container>
    </div>
  )
}

export default Dashboard
