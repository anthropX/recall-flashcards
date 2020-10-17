import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CustomNavbar from './CustomNavbar'
import Dashboard from './Dashboard'
import Footer from './Footer'

const App = () => {
  return (
    <div className='App min-vh-100 d-flex flex-column position-relative'>
      <CustomNavbar />

      <div
        className={`main-content main-content--${
          useLocation().pathname === '/' ? 'wall' : 'solid'
        } flex-grow-1`}>
        <Container className='text-light'>
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
          </Switch>
        </Container>
      </div>

      <Footer />
    </div>
  )
}

export default App
