const initialState = {
  name: 'Asian Countries',
  desc: 'Learn capitals, flags, and other details about Asian countries',
  mastered: 0,
  total: 3,
  cards: [
    {
      question: 'Lebanon',
      answerTitle: 'Lebanon',
      answerImage:
        'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg',
      answerDesc: `Capital:Beirut
      Flag Description:
      1) Triband: Red, White, Red
      2) Green Cedar Tree
      https://en.wikipedia.org/wiki/Lebanon`,
    },
    {
      question: 'Qatar',
      answerTitle: 'Qatar',
      answerImage:
        'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
      answerDesc: `Capital: Doha
        Flag Description:
        Maroon with a broad white serrated band (nine white points) on the hoist side.
        https://en.wikipedia.org/wiki/Qatar`,
    },
    {
      question: 'Nepal',
      answerTitle: 'Nepal',
      answerImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/394px-Flag_of_Nepal.svg.png',
      answerDesc: `Capital: Kathmandu
      Flag Description:
      The national flag of Nepal consists of two juxtaposed triangular figures with a crimson-coloured base and deep blue borders, there being a white emblem of the crescent moon with eight rays visible out of sixteen in the upper part and a white emblem of a twelve rayed sun in the lower part`,
    },
  ],
}
export default function (state = initialState, { type }) {
  switch (type) {
    default:
      return state
  }
}
