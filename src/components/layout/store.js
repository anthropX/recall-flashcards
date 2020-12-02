import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from '../../reducers'
import { loadState, saveState } from './localStorage'

const initialState = loadState()
const middlewares = applyMiddleware(thunk)

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(middlewares),
)

store.subscribe(() => {
  const { isDark, decks } = store.getState()
  saveState({ isDark, decks })
})

export default store
