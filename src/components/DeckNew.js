import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import deckNewLightImg from '../img/create-light.svg'
import deckNewDarkImg from '../img/create-dark.svg'
import deckNewHLImg from '../img/create-highlight.svg'

const DeckNew = ({ isDark }) => {
  return (
    <div className='create-new position-relative'>
      <Link
        to='/decks/new'
        className='create-new__link position-absolute text-center order-last'
      />
      <div className='create-new__graphic-box position-relative mt-4 mb-2'>
        <div className='create-new__graphic position-absolute'>
          <object
            preserveAspectRatio='xMidYMid meet'
            data={isDark ? deckNewDarkImg : deckNewLightImg}
            type='image/svg+xml'
            aria-label='create-new__graphic'
          />
        </div>
        <div className='create-new__graphic--hover position-absolute'>
          <object
            preserveAspectRatio='xMidYMid meet'
            data={deckNewHLImg}
            type='image/svg+xml'
            aria-label='create-new__graphic--hover'
          />
        </div>
      </div>
      <p className='create-new__title link--accented text-center'>
        Create new deck
      </p>
    </div>
  )
}

DeckNew.propTypes = {
  isDark: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    isDark: state.isDark,
  }
}

export default connect(mapStateToProps)(DeckNew)
