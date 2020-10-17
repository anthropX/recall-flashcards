import React from 'react'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1 className='dashboard__heading display-4 pt-5 mb-0'>
        <span className='accented'>Recall </span> flashcards
      </h1>
      <p className='dashboard__text lead w-75 mb-4'>
        Create flashcards for free! Break down your study material into small
        digestible bits of information. Learn until you reach mastery. No ads
        whatsoever for full immersive learning.
      </p>
      <Button variant='danger' className='dashboard__button'>
        Get Started
      </Button>
    </div>
  )
}

export default Dashboard
