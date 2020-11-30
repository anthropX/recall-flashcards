import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'
import FlippableCard from './FlippableCard'
import Spinner from '../layout/Spinner'
import PlayAreaService from './PlayAreaService'
import { setBuckets } from '../../actions/decksPage'
import processParams from '../layout/processParams'

const PlayArea = ({ setBuckets, deckId, deck }) => {
  const [service, setService] = useState(null)
  if (deck && !service) setService(new PlayAreaService(deck))
  const [isCardFocused, setCardFocused] = useState(false)
  const cardRef = useRef(null)

  const handleResponse = (isAffirmation) => {
    setBuckets({ deckId, buckets: service.updateBuckets(isAffirmation) })
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
              handleResponse={handleResponse}
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
  deckId: PropTypes.string.isRequired,
  deck: PropTypes.shape({
    deckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        cardId: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        answerTitle: PropTypes.string.isRequired,
        answerImage: PropTypes.string.isRequired,
        answerDesc: PropTypes.string.isRequired,
      }),
    ).isRequired,
    buckets: PropTypes.shape({
      new: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      highFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mdFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      lowFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mastered: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export default connect(null, { setBuckets })(processParams(PlayArea))
