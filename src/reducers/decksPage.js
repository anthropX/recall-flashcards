import {
  SET_DECK_INDEX,
  ADD_CARD,
  SET_CARD,
  DELETE_CARD,
} from '../actions/types'

const initialState = {
  deckIndex: -1,
  decks: [
    {
      name: 'Periodic Table',
      desc:
        'Learn atomic numbers and classifications of elements of the periodic table',
      mastered: 27,
      total: 118,
      cards: [],
    },
    {
      name: 'Asian Countries',
      desc: 'Learn capitals, flags, and other details about Asian countries',
      mastered: 19,
      total: 48,
      cards: [
        {
          question: '<h4><i>Lebanon</i></h4>',
          answerTitle: '<h5><i>Lebanon</i></h5>',
          answerImage:
            'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg',
          answerDesc:
            '<p><i><strong>Capital</strong></i><strong>: </strong>Beirut&nbsp;</p><p><i><strong>Flag Description:</strong></i> Red, White, Red, Green Cedar Tree&nbsp;</p><p><a href="https://en.wikipedia.org/wiki/Lebanon">https://en.wikipedia.org/wiki/Lebanon</a></p>',
        },
        {
          question: '<h4><i>Qatar</i></h4>',
          answerTitle: '<h5><i>Qatar</i></h5>',
          answerImage:
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
          answerDesc:
            '<p><i><strong>Capital:</strong></i> Doha&nbsp;</p><p><i><strong>Flag Description:</strong></i> Maroon with a broad white serrated band (nine white points) on the hoist side.&nbsp;</p><p><a href="https://en.wikipedia.org/wiki/Qatar">https://en.wikipedia.org/wiki/Qatar</a></p>',
        },
        {
          question: '<h4><i>Nepal</i></h4>',
          answerTitle:
            '<h5><a href="https://en.wikipedia.org/wiki/Nepal" class="ck-link_selected"><i><strong>Nepal</strong> - Wikipedia</i></a></h5><p><br data-cke-filler="true"></p><p><i><strong>Capital:</strong></i> Kathmandu&nbsp;</p><p><i><strong>Flag Description:</strong>&nbsp;</i></p>',
          answerImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/394px-Flag_of_Nepal.svg.png',
          answerDesc:
            '<blockquote><p>Two juxtaposed triangular figures with a crimson-coloured base and deep blue borders</p><ol><li>Upper part: Crescent moon with eight of sixteen visible rays</li><li>Lower part: Twelve rayed sun</li></ol></blockquote>',
        },
      ],
    },
    {
      name: 'GRE Words',
      desc: 'Master the top 100 GRE words',
      mastered: 100,
      total: 100,
      cards: [],
    },
    {
      name: 'Pokemon',
      desc: 'Memorize Pokedex numbers and types of the original 151 pokemons',
      mastered: 0,
      total: 151,
      cards: [],
    },
  ],
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_DECK_INDEX:
      return { ...state, deckIndex: payload }
    case ADD_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: [...deck.cards, payload.card],
              }
            : deck,
        ),
      }
    case SET_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: deck.cards.map((card, cardIndex) =>
                  cardIndex === payload.cardIndex
                    ? {
                        ...payload.card,
                      }
                    : card,
                ),
              }
            : deck,
        ),
      }
    case DELETE_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: deck.cards.filter(
                  (card, cardIndex) => cardIndex !== payload.cardIndex,
                ),
              }
            : deck,
        ),
      }
    default:
      return state
  }
}
