import React, { useState, useRef } from 'react'
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
  const [service, setService] = useState(null)
  if (deck && !service) setService(new PlayAreaService(deck))
  const [isCardFocused, setCardFocused] = useState(false)
  const cardRef = useRef(null)

  const handleAffirmation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(true) })
    setCardFocused(false)
    cardRef.current.blur()
  }

  const handleNegation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(false) })
    setCardFocused(false)
    cardRef.current.blur()
  }

  return service ? (
    <div className='playarea'>
      <h1 className='display-5 mb-1 d-flex flex-wrap'>Playing {deck.name}</h1>
      <div className='cards__card pb-4 mt-3'>
        <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
          <div className='card__side--transparent flippable-card-container mr-0 mr-md-3 mb-3 mb-lg-0 border-none'>
            <FlippableCard
              card={service.getCard()}
              cardRef={cardRef}
              isCardFocused={isCardFocused}
              handleAffirmation={handleAffirmation}
              handleNegation={handleNegation}
              setCardFocused={setCardFocused}
            />
            <p className='p2 my-2 text-muted'>{service.getProgressDesc()}</p>
            <ProgressBar className='mb-3'>
              <ProgressBar
                variant='danger'
                now={service.getProgressPercentage('highFreq')}
                label={`${service.getProgressPercentage('highFreq')}%`}
                srOnly={service.getProgressPercentage('highFreq') < 6}
              />
              <ProgressBar
                variant='threat'
                now={service.getProgressPercentage('mdFreq')}
                label={`${service.getProgressPercentage('mdFreq')}%`}
                srOnly={service.getProgressPercentage('mdFreq') < 6}
              />
              <ProgressBar
                variant='warning'
                now={service.getProgressPercentage('lowFreq')}
                label={`${service.getProgressPercentage('lowFreq')}%`}
                srOnly={service.getProgressPercentage('lowFreq') < 6}
              />
              <ProgressBar
                variant='success'
                now={service.getProgressPercentage('mastered')}
                label={`${service.getProgressPercentage('mastered')}%`}
                srOnly={service.getProgressPercentage('mastered') < 6}
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
