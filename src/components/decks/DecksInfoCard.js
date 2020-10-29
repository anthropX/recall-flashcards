import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const DecksInfoCard = ({ selectedDeck: { name, desc, mastered, total } }) => {
  function closeSidebar() {
    // Close Sidebar
    document
      .querySelector('.fluid-overlay')
      .classList.remove('fluid-overlay--overlaid')
    // Blur previously focused deck-graphic
    document
      .querySelectorAll('.decks .deck-graphic')
      .forEach((graphic) => graphic.blur())
    // Hide Reset, in case any
    hideReset()
  }

  function handleSidebarClick(event) {
    const { classList } = event.target
    if (
      classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')
    )
      closeSidebar()
  }

  function showReset() {
    document.querySelector('.fluid-box').classList.add('fluid-box--reset')
  }

  function hideReset() {
    document.querySelector('.fluid-box').classList.remove('fluid-box--reset')
  }

  function getProgressPercentage() {
    if (total === 0) return 0
    return Math.floor((mastered / total) * 100)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className='fluid-overlay'
      onClick={handleSidebarClick}
      onWheel={closeSidebar}
      onTouchMove={closeSidebar}>
      <div className='fluid-box pl-md-3 pr-md-0' tabIndex='-1'>
        <aside
          className={`decks-infocard aside pl-md-3 pr-md-0 ${
            name === '' ? 'invisible' : 'visible'
          }`}>
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
                to='/decks/0/play'
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-play' />
                <p className='p2 mt-2 mb-0'>Play</p>
              </Link>
            </Col>
            <Col xs='3' className='pl-0 pr-md-3'>
              <Link
                to='/decks/0'
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-cog' />
                <p className='p2 mt-2 mb-0'>Configure</p>
              </Link>
            </Col>
            <Col xs='3' className='pl-0 pr-md-3'>
              <button
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'
                type='button'
                onClick={showReset}>
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
            onClick={hideReset}>
            Cancel
          </Button>
          <Button
            variant='outline-danger'
            type='submit'
            className='px-4 mt-2 mb-3'
            onClick={hideReset}>
            Confirm
          </Button>
        </aside>
      </div>
    </div>
  )
}

DecksInfoCard.propTypes = {
  selectedDeck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mastered: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  selectedDeck: state.selectedDeck,
})

export default connect(mapStateToProps)(DecksInfoCard)
