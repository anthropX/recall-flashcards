import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { deleteCard, removeCardFromBuckets } from '../../actions/decks'
import { showAlert } from '../../actions/alerts'

const DeleteCardButton = ({
  showAlert,
  deleteCard,
  removeCardFromBuckets,
  isDark,
  deckId,
  deckName,
  cardIndex,
  cardId,
}) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleConfirmDelete = () => {
    const payload = { deckId, cardId }
    deleteCard(payload)
    removeCardFromBuckets(payload)
    handleClose()
    showAlert('success', `Card deleted from ${deckName} deck!`)
  }

  return (
    <>
      <Button variant='outline-danger' onClick={handleShow}>
        Delete Card
      </Button>

      <Modal
        className={isDark && 'modal-content--dark'}
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Card?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to delete card #${
            cardIndex + 1
          } from ${deckName} Deck? This
          action cannot be undone.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='outline-danger' onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

DeleteCardButton.propTypes = {
  showAlert: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  removeCardFromBuckets: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  deckId: PropTypes.string.isRequired,
  deckName: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  isDark: state.isDark,
})

export default connect(mapStateToProps, {
  showAlert,
  deleteCard,
  removeCardFromBuckets,
})(DeleteCardButton)
