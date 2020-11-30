import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import NotFound from './NotFound'

const processParams = (ChildComponent) => {
  const ComposedComponent = ({
    match: {
      params: { deckId, cardId },
    },
    decks,
    ...rest
  }) => {
    const deck = decks.filter((deck) => deck.deckId === deckId)[0]
    const card =
      deck && cardId && deck.cards.filter((card) => cardId === card.cardId)[0]
    return deck && (!cardId || card) ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ChildComponent {...{ deckId, deck, cardId, card, ...rest }} />
    ) : (
      <NotFound />
    )
  }

  ComposedComponent.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        deckId: PropTypes.string.isRequired,
        cardId: PropTypes.string,
      }).isRequired,
    }).isRequired,
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
  }

  const mapStateToProps = (state) => ({
    decks: state.decksPage.decks,
  })

  return withRouter(connect(mapStateToProps)(ComposedComponent))
}

export default processParams
