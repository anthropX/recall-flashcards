import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { removeDeck } from '../../actions/decks'
import { showAlert } from '../../actions/alerts'
import DeckDelete from './DeckDelete'
import DeckInfo from './DeckInfo'

const DeckInfoCard = ({
  showAlert,
  setSidebarOverlaid,
  removeDeck,
  match: {
    params: { deckId },
  },
  history,
  deck: { name, desc, cards },
  isSidebarOverlaid,
}) => {
  const [comfirmation, setConfirmation] = useState('')
  const [isDeleteVisible, setDeleteVisible] = useState(false)

  const handleDeleteCancellation = () => {
    setConfirmation('')
    setDeleteVisible(false)
  }

  const handleConfirmationSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (comfirmation === name) {
      removeDeck(deckId)
      history.push('/decks')
      showAlert('success', `${name} deck deleted!`)
    }
  }

  const handleSidebarClick = ({ target: { classList } }) =>
    (classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')) &&
    setSidebarOverlaid(false)

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`deck-fluid-overlay fluid-overlay ${
        isSidebarOverlaid && 'fluid-overlay--overlaid'
      }`}
      onClick={handleSidebarClick}
      onWheel={() => setSidebarOverlaid(false)}
      onTouchMove={() => setSidebarOverlaid(false)}>
      <div
        className={`fluid-box ${
          isDeleteVisible && 'fluid-box--delete'
        } pl-md-3 pr-md-0`}
        tabIndex='-1'>
        <DeckInfo
          deckId={deckId}
          name={name}
          desc={desc}
          cards={cards}
          setDeleteVisible={setDeleteVisible}
        />
        <DeckDelete
          name={name}
          comfirmation={comfirmation}
          setConfirmation={setConfirmation}
          handleConfirmationSubmit={handleConfirmationSubmit}
          handleDeleteCancellation={handleDeleteCancellation}
        />
      </div>
    </div>
  )
}

DeckInfoCard.propTypes = {
  showAlert: PropTypes.func.isRequired,
  setSidebarOverlaid: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
  }).isRequired,
  isSidebarOverlaid: PropTypes.bool.isRequired,
}

export default withRouter(
  connect(null, { showAlert, removeDeck })(DeckInfoCard),
)
