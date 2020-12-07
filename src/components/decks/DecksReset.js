import React from 'react'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

const DecksReset = ({ name, setResetVisible, handleResetConfirmation }) => {
  return (
    <aside className='decks-infocard aside pl-md-3 pr-md-0 d-flex flex-column'>
      <div className='aside__close'>
        <i className='fas fa-times text-muted' />
      </div>
      <p className='mr-5 mr-md-0'>
        Are you sure you want to{' '}
        <strong className='text-danger'>reset progress</strong> for the deck,{' '}
        <strong>{name}</strong>? This action cannot be undone.
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
  )
}

DecksReset.propTypes = {
  setResetVisible: PropTypes.func.isRequired,
  handleResetConfirmation: PropTypes.func.isRequired,
  name: PropTypes.string,
}

DecksReset.defaultProps = {
  name: '',
}

export default DecksReset
