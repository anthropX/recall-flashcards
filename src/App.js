import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomNavbar from './CustomNavbar'
import Dashboard from './Dashboard'

function App() {
  return (
    <div className='App'>
      <CustomNavbar />

      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  )
}

export default App
