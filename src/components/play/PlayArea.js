import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'
import FlippableCard from './FlippableCard'
import Spinner from '../layout/Spinner'
import PlayAreaService from './PlayAreaService'
import { setBuckets } from '../../actions/decksPage'

const PlayArea = ({
  setBuckets,
  match: {
    params: { deckIndex },
  },
  decks,
}) => {
  const deck = decks[deckIndex]
  let card
  let cards
  let buckets
  let service

  if (deck) {
    service = new PlayAreaService(deck)
    card = service.getCard()
    cards = deck.cards
    buckets = deck.buckets
  }

  const handleCardFocus = () =>
    document
      .querySelector('.flippable-card')
      .classList.add('flippable-card__focus')

  const handleAffirmation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(true) })
    document
      .querySelector('.flippable-card')
      .classList.remove('flippable-card__focus')
  }
  const handleNegation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(false) })
    document
      .querySelector('.flippable-card')
      .classList.remove('flippable-card__focus')
  }

  const getVerb = () => {
    let verb = 'Touched'
    if (
      cards.length === buckets.new.length ||
      cards.length === buckets.new.length + buckets.highFreq.length
    )
      verb = 'Learning'
    else if (cards.length === buckets.new.length + buckets.mdFreq.length)
      verb = 'Revising'
    else if (cards.length === buckets.new.length + buckets.lowFreq.length)
      verb = 'Mastering'
    else if (cards.length === buckets.new.length + buckets.mastered.length)
      verb = 'Mastered'
    return verb
  }

  const getMasteredPercentage = () => {
    if (buckets.mastered.length === 0) return 0
    return Math.floor((buckets.mastered.length / cards.length) * 100)
  }

  const getHighFreqPercentage = () => {
    if (buckets.highFreq.length === 0) return 0
    return Math.floor((buckets.highFreq.length / cards.length) * 100)
  }

  const getMdFreqPercentage = () => {
    if (buckets.mdFreq.length === 0) return 0
    return Math.floor((buckets.mdFreq.length / cards.length) * 100)
  }

  const getLowFreqPercentage = () => {
    if (buckets.lowFreq.length === 0) return 0
    return Math.floor((buckets.lowFreq.length / cards.length) * 100)
  }

  return deck ? (
    <div className='playarea'>
      <h1 className='display-5 mb-1 d-flex flex-wrap'>Playing {deck.name}</h1>
      <div className='cards__card pb-4 mt-3'>
        <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
          <div className='card__side--transparent flippable-card-container mr-0 mr-md-3 mb-3 mb-lg-0 border-none'>
            <FlippableCard
              card={card}
              handleAffirmation={handleAffirmation}
              handleNegation={handleNegation}
              handleCardFocus={handleCardFocus}
            />
            <p className='p2 my-2 text-muted'>
              {getVerb()}
              {` ${cards.length - buckets.new.length} `}
              of {cards.length} cards
            </p>
            <ProgressBar className='mb-3'>
              <ProgressBar
                variant='danger'
                now={getHighFreqPercentage()}
                label={`${getHighFreqPercentage()}%`}
                srOnly={getHighFreqPercentage() < 6}
              />
              <ProgressBar
                variant='threat'
                now={getMdFreqPercentage()}
                label={`${getMdFreqPercentage()}%`}
                srOnly={getMdFreqPercentage() < 6}
              />
              <ProgressBar
                variant='warning'
                now={getLowFreqPercentage()}
                label={`${getLowFreqPercentage()}%`}
                srOnly={getLowFreqPercentage() < 6}
              />
              <ProgressBar
                variant='success'
                now={getMasteredPercentage()}
                label={`${getMasteredPercentage()}%`}
                srOnly={getMasteredPercentage() < 6}
              />
            </ProgressBar>
          </div>
          <div className='card__side card-back d-none d-lg-flex flex-column invisible' />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

PlayArea.propTypes = {
  setBuckets: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answerTitle: PropTypes.string.isRequired,
          answerImage: PropTypes.string.isRequired,
          answerDesc: PropTypes.string.isRequired,
        }),
      ).isRequired,
      buckets: PropTypes.shape({
        new: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        highFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        mdFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        lowFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        mastered: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps, { setBuckets })(PlayArea)
