import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomNavbar from './CustomNavbar'
import Dashboard from './Dashboard'
import Footer from './Footer'

function App() {
  return (
    <div className='App min-vh-100 d-flex flex-column position-relative'>
      <CustomNavbar />

      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App
