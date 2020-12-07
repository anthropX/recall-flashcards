import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetBuckets } from '../../actions/decks'
import { showAlert } from '../../actions/alerts'
import DecksInfo from './DecksInfo'
import DecksReset from './DecksReset'

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
  const deck = deckId ? decks.filter((deck) => deck.deckId === deckId)[0] : {}

  const closeSidebar = () => {
    setSidebarOverlaid(false)
    setResetVisible(false)
  }

  const handleSidebarClick = ({ target: { classList } }) =>
    (classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')) &&
    closeSidebar()

  const handleResetConfirmation = () => {
    resetBuckets(deckId)
    setResetVisible(false)
    setSidebarOverlaid(false)
    showAlert(
      'success',
      `You've successfully reset progress for ${deck.name} deck`,
    )
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
        <DecksInfo
          deckId={deckId}
          deck={deck}
          setResetVisible={setResetVisible}
        />
        <DecksReset
          name={deck.name}
          setResetVisible={setResetVisible}
          handleResetConfirmation={handleResetConfirmation}
        />
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
