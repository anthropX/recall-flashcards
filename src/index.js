import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App'
import './scss/App.scss'
import Root from './components/Root'

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
)
