import React from 'react'
import Decks from './Decks'
import DecksInfoCard from './DecksInfoCard'

const DecksPage = () => {
  return (
    <div className='decks-page d-flex flex-column flex-md-row'>
      <div className='decks-main flex-grow-1 mr-auto pr-0 pr-md-5' sm='auto'>
        <h1 className='display-5 mb-1'>Decks</h1>
        <p className='p1 mb-0 pr-0 pr-md-5'>
          Here’s a collection of all your decks. Choose a deck to view more
          details or create a new deck!
        </p>
        <Decks />
      </div>
      <DecksInfoCard />
    </div>
  )
}

export default DecksPage
