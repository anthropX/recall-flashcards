import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomNavbar from './components/layout/CustomNavbar'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import About from './components/about/About'
import Footer from './components/layout/Footer'
import DecksPage from './components/decks/DecksPage'
import DeckPage from './components/deck/DeckPage'
import CreateDeck from './components/deckActions/CreateDeck'
import RenameDeck from './components/deckActions/RenameDeck'
import EditCard from './components/cardActions/EditCard'
import CreateCard from './components/cardActions/CreateCard'
import PlayArea from './components/play/PlayArea'
import NotFound from './components/layout/NotFound'
import dashboardImg from './img/dashboard-background.jpg'
import { setDecks } from './actions/decksPage'
import { getDecks } from './util/api'
import Alerts from './components/layout/Alerts'

const App = ({ setDecks, isDark }) => {
  const wallOverlay = ['#302d2db5', '#302d2d59']

  const ColorStyle = () => {
    if (useLocation().pathname === '/') return 'main-content--wall text-white'
    if (isDark) return 'main-content--dark text-light'
    return 'bg-white text-dark'
  }

  const BgImageStyle = () => {
    if (useLocation().pathname !== '/') return 'none'
    return `linear-gradient(${wallOverlay}), url(${dashboardImg})`
  }

  useEffect(() => {
    console.log('App useEffect!')
    setDecks(getDecks())
  }, [setDecks])

  return (
    <div className='App min-vh-100 d-flex flex-column position-relative'>
      <CustomNavbar />

      <div
        className={`main-content ${ColorStyle()} flex-grow-1 text-break`}
        style={{
          backgroundImage: BgImageStyle(),
          backgroundSize: 'cover',
          backgroundPosition: 'left 0px',
        }}>
        <Container>
          <Alerts />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/decks' component={DecksPage} />
            <Route exact path='/decks/new' component={CreateDeck} />
            <Route exact path='/decks/:deckId' component={DeckPage} />
            <Route exact path='/decks/:deckId/update' component={RenameDeck} />
            <Route
              exact
              path='/decks/:deckId/cards/:cardId/update'
              component={EditCard}
            />
            <Route
              exact
              path='/decks/:deckId/cards/new'
              component={CreateCard}
            />
            <Route exact path='/decks/:deckId/play' component={PlayArea} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>

      <Footer isDark={isDark} />
    </div>
  )
}

App.propTypes = {
  setDecks: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isDark: state.isDark,
})

export default connect(mapStateToProps, { setDecks })(App)
