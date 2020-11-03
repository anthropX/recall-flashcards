import { SET_CARD } from '../actions/types'

const initialState = {
  name: 'Asian Countries',
  desc: 'Learn capitals, flags, and other details about Asian countries',
  mastered: 0,
  total: 3,
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
}
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_CARD:
      state.cards.splice(payload.cardIndex, 1, payload.card)
      return state
    default:
      return state
  }
}
