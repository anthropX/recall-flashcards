import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

const initialState = {}

export default createStore(reducers, initialState, composeWithDevTools())
