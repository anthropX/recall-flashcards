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

const App = ({ isDark }) => {
  const ColorStyle = () => {
    if (useLocation().pathname === '/') return 'main-content--wall text-white'
    if (isDark) return 'main-content--dark text-light'
    return 'bg-white text-dark'
  }

  return (
    <div className='App min-vh-100 d-flex flex-column position-relative'>
      <CustomNavbar />

      <div className={`main-content ${ColorStyle()} flex-grow-1`}>
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
          </Switch>
        </Container>
      </div>

      <Footer />
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
