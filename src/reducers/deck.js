export default function (
  state = {
    name: 'Asian Countries',
    desc: 'Learn capitals, flags, and other details about Asian countries',
    mastered: 19,
    total: 48,
    cards: [
      {
        question: 'Germany',
        answerHeading: 'Germany',
        description: `Capital: Tokyo
        Flag Description: White banner bearing a crimson-red disc at its center. It embodies the country’s sobriquet: Land of the Rising Sun.
        https://en.wikipedia.org/wiki/Japan`,
      },
      {
        question:
          'What’s the difference between Cookies, Local Storage, & Session Storage?',
        answerHeading:
          'What’s the difference between Cookies, Local Storage, & Session Storage?',
        description: `Capital: Beirut
        Flag Description:
           1) Triband: Red, White, Red
           2) Green Cedar Tree
        https://en.wikipedia.org/wiki/Lebanon`,
      },
    ],
  },
  { type },
) {
  switch (type) {
    default:
      return state
  }
}
