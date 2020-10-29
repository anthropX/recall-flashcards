import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CardNew from './CardNew'
import DeckInfoCard from './DeckInfoCard'

const DecksPage = ({ deck: { name, desc } }) => {
  const handleClick = () => {
    document
      .querySelector('.fluid-overlay')
      .classList.add('fluid-overlay--overlaid')
    // Hide Reset
    document.querySelector('.fluid-box').classList.remove('fluid-box--delete')
  }
  return (
    <div className='deck-page d-flex flex-column flex-md-row'>
      <div className='deck-main flex-grow-1 mr-auto pr-0 pr-md-5' sm='auto'>
        <h1 className='display-5 mb-1 d-flex flex-wrap'>
          <span className='mr-4'>{name} Deck</span>
          <button
            className='icon-button d-flex align-items-center d-md-none pl-0'
            onClick={handleClick}
            type='button'>
            <i className='deck-main__icon fas fa-ellipsis-h my-3' />
          </button>
        </h1>
        <p className='p1 mb-0 pr-0 pr-md-5'>{desc}</p>
        <CardNew />
      </div>
      <DeckInfoCard />
    </div>
  )
}

DecksPage.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mastered: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  deck: state.deck,
})

export default connect(mapStateToProps)(DecksPage)
