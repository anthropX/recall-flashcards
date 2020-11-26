const deck = require('../data/deck.json')
const decks = require('../data/decks.json')

export function getDecks() {
  return decks
}

export function getDeck() {
  return deck
}
