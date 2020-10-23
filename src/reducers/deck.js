export default function (
  state = {
    name: 'Periodic Table',
    desc:
      'Learn atomic numbers and classifications of elements of the periodic table',
    mastered: 27,
    total: 118,
  },
  { type },
) {
  switch (type) {
    default:
      return state
  }
}
