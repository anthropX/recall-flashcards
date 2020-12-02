import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { resetBuckets } from '../../actions/decks'
import { showAlert } from '../../actions/alerts'

const DecksInfoCard = ({
  showAlert,
  setSidebarOverlaid,
  setResetVisible,
  resetBuckets,
  deckId,
  decks,
  isSidebarOverlaid,
  isResetVisible,
}) => {
  const { name, desc, buckets, cards } =
    deckId && decks.filter((deck) => deck.deckId === deckId)[0]
  let total
  let mastered
  let isEmpty
  if (cards && buckets) {
    total = cards.length
    mastered = buckets.mastered.length
    isEmpty = total === buckets.new.length
  }

  const closeSidebar = () => {
    setSidebarOverlaid(false)
    setResetVisible(false)
  }

  const handleSidebarClick = ({ target: { classList } }) =>
    (classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')) &&
    closeSidebar()

  const getProgressPercentage = () => {
    if (total === 0) return 0
    return Math.floor((mastered / total) * 100)
  }

  const handleResetConfirmation = () => {
    resetBuckets(deckId)
    setResetVisible(false)
    setSidebarOverlaid(false)
    showAlert('success', `You've successfully reset progress for ${name} deck`)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`fluid-overlay ${
        isSidebarOverlaid && 'fluid-overlay--overlaid'
      }`}
      onClick={handleSidebarClick}
      onWheel={closeSidebar}
      onTouchMove={closeSidebar}>
      <div
        className={`fluid-box ${
          isResetVisible && 'fluid-box--reset'
        } pl-md-3 pr-md-0`}
        tabIndex='-1'>
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
          <hr className='hr mt-2 mb-4 ml-0' />
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
        <aside className='decks-infocard aside pl-md-3 pr-md-0 d-flex flex-column'>
          <div className='aside__close'>
            <i className='fas fa-times text-muted' />
          </div>
          <p className='mr-5 mr-md-0'>
            Are you sure you want to{' '}
            <strong className='text-danger'>reset progress</strong> for the
            deck, <strong>{name}</strong>? This action cannot be undone.
          </p>
          <Button
            variant='outline-secondary'
            type='submit'
            className='px-4 mt-2 mb-3'
            onClick={() => setResetVisible(false)}>
            Cancel
          </Button>
          <Button
            variant='outline-danger'
            type='submit'
            className='px-4 mt-2 mb-3'
            onClick={handleResetConfirmation}>
            Confirm
          </Button>
        </aside>
      </div>
    </div>
  )
}

DecksInfoCard.propTypes = {
  showAlert: PropTypes.func.isRequired,
  setSidebarOverlaid: PropTypes.func.isRequired,
  setResetVisible: PropTypes.func.isRequired,
  resetBuckets: PropTypes.func.isRequired,
  deckId: PropTypes.string.isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  isSidebarOverlaid: PropTypes.bool.isRequired,
  isResetVisible: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decks,
})

export default connect(mapStateToProps, { showAlert, resetBuckets })(
  DecksInfoCard,
)
