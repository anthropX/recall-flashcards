export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (error) {
    console.error('Failed to read local storage')
    return undefined
  }
}
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error('Failed to write to local storage')
  }
}
