import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DecksInfo = ({ setResetVisible, deckId, deck }) => {
  const { name, desc, buckets, cards } = deck
  let total
  let mastered
  let isEmpty
  if (cards && buckets) {
    total = cards.length
    mastered = buckets.mastered.length
    isEmpty = total === buckets.new.length
  }

  const getProgressPercentage = () => {
    if (total === 0) return 0
    return Math.floor((mastered / total) * 100)
  }

  return (
    <aside
      className={`decks-infocard aside ${
        typeof name === 'undefined' && 'invisible'
      } pl-md-3 pr-md-0`}>
      <h6 className='h6 mt-0'>{name}</h6>
      <div className='aside__close'>
        <i className='fas fa-times text-muted' />
      </div>
      <p className='p2 my-2 text-muted'>
        Mastered {mastered} of {total} cards
      </p>
      <ProgressBar
        striped
        variant='danger'
        now={getProgressPercentage()}
        label={`${getProgressPercentage()}%`}
        srOnly={getProgressPercentage() < 6}
      />
      <p className='p1 mt-3 mb-0'>{desc}</p>
      <hr className='hr hr--100 mt-2 mb-4 ml-0' />
      <Row>
        <Col xs='3' className='pl-2 pr-0'>
          <Link
            to={`/decks/${deckId}/play`}
            className={`aside__option ${total === 0 && 'link--disabled'}
                 text-decoration-none d-flex flex-column align-items-center p-2`}>
            <i className='aside__icon fas fa-play' />
            <p className='p2 mt-2 mb-0'>Play</p>
          </Link>
        </Col>
        <Col xs='3' className='pl-0 pr-md-3'>
          <Link
            to={`/decks/${deckId}`}
            className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
            <i className='aside__icon fas fa-cog' />
            <p className='p2 mt-2 mb-0'>Configure</p>
          </Link>
        </Col>
        <Col xs='3' className='pl-0 pr-md-3'>
          <button
            className={`aside__option ${
              isEmpty && 'link--disabled'
            } text-decoration-none d-flex flex-column align-items-center p-2`}
            type='button'
            onClick={() => setResetVisible(true)}>
            <i className='aside__icon fas fa-sync-alt' />
            <p className='p2 mt-2 mb-0 text-nowrap'>Reset Progress</p>
          </button>
        </Col>
      </Row>
    </aside>
  )
}

DecksInfo.propTypes = {
  setResetVisible: PropTypes.func.isRequired,
  deckId: PropTypes.string.isRequired,
  deck: PropTypes.shape({
    deckId: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        cardId: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        answerTitle: PropTypes.string.isRequired,
        answerImage: PropTypes.string.isRequired,
        answerDesc: PropTypes.string.isRequired,
      }),
    ),
    buckets: PropTypes.shape({
      new: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      highFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mdFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      lowFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mastered: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }),
  }).isRequired,
}

export default DecksInfo
