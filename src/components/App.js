import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomNavbar from './CustomNavbar'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import About from './About'
import Footer from './Footer'
import DecksPage from './decks/DecksPage'
import DeckPage from './deck/DeckPage'
import CreateDeck from './deckActions/CreateDeck'
import RenameDeck from './deckActions/RenameDeck'
import EditCard from './cardActions/EditCard'

const App = ({ isDark }) => {
  const ColorStyle = () => {
    if (useLocation().pathname === '/') return 'main-content--wall text-white'
    if (isDark) return 'main-content--dark text-light'
    return 'bg-white text-dark'
  }

  return (
    <div className='App min-vh-100 d-flex flex-column position-relative'>
      <CustomNavbar />

      <div className={`main-content ${ColorStyle()} flex-grow-1 text-break`}>
        <Container>
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route exact path='/decks'>
              <DecksPage />
            </Route>
            <Route exact path='/decks/new'>
              <CreateDeck />
            </Route>
            <Route exact path='/decks/:id'>
              <DeckPage />
            </Route>
            <Route exact path='/decks/:id/update'>
              <RenameDeck />
            </Route>
            <Route
              exact
              path='/decks/:deckIndex/cards/:cardIndex/update'
              component={EditCard}
            />
          </Switch>
        </Container>
      </div>

      <Footer isDark={isDark} />
    </div>
  )
}

App.propTypes = {
  isDark: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    isDark: state.isDark,
  }
}

export default connect(mapStateToProps)(App)
