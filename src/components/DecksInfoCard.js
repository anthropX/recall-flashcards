import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const DecksInfoCard = ({ deck: { name, desc, mastered, total } }) => {
  const closeSidebar = () => {
    document
      .querySelector('.fluid-overlay')
      .classList.remove('fluid-overlay--overlaid')
    // Blur previously focused deck-graphic
    document
      .querySelectorAll('.decks .deck-graphic')
      .forEach((graphic) => graphic.blur())
  }

  const handleSidebarClick = (event) => {
    const { classList } = event.target
    if (
      classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')
    )
      closeSidebar()
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className='fluid-overlay'
      onClick={handleSidebarClick}
      onWheel={closeSidebar}
      onTouchMove={closeSidebar}>
      <div className='fluid-box pl-md-3 pr-md-0' tabIndex='-1'>
        <aside className='decks-infocard aside pl-md-3 pr-md-0'>
          <h6 className='h6 mt-0'>{name}</h6>
          <div className='aside__close'>
            <i className='fas fa-times text-muted' />
          </div>
          <p className='p2 my-2 text-muted'>
            Mastered {mastered} of {total} cards
          </p>
          <ProgressBar striped variant='danger' now={40} />
          <p className='p1 mt-3 mb-0'>{desc}</p>
          <hr className='hr mt-2 mb-4' />
          <Row>
            <Col xs='3' className='pl-2 pr-0'>
              <Link
                to='/play'
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-play' />
                <p className='p2 mt-2 mb-0'>Play</p>
              </Link>
            </Col>
            <Col xs='3' className='pl-0 pr-md-3'>
              <Link
                to='/deck/{id}'
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-cog' />
                <p className='p2 mt-2 mb-0'>Configure</p>
              </Link>
            </Col>
            <Col xs='3' className='pl-0 pr-md-3'>
              <a
                href='/decks'
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-sync-alt' />
                <p className='p2 mt-2 mb-0 text-nowrap'>Reset Progress</p>
              </a>
            </Col>
          </Row>
        </aside>
      </div>
    </div>
  )
}

DecksInfoCard.propTypes = {
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

export default connect(mapStateToProps)(DecksInfoCard)
