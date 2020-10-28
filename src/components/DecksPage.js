import React from 'react'
import Decks from './Decks'
import DecksInfoCard from './DecksInfoCard'

const DecksPage = () => {
  const blurDeckGraphics = (event) => {
    console.log(
      'blurring blurring',
      event.target.tagName,
      !document.querySelector('.fluid-overlay').contains(event.target),
      event.target.className,
      event.target.className.match('deck-graphic'),
    )

    if (
      !document.querySelector('.fluid-overlay').contains(event.target) &&
      !event.target.className.match(/deck-graphic/)
    ) {
      console.log('blurred blurred')
      document
        .querySelectorAll('.decks .deck-graphic')
        .forEach((graphic) => graphic.classList.remove('deck-graphic--opened'))
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className='decks-page d-flex flex-column flex-md-row'
      onClick={blurDeckGraphics}>
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
