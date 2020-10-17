import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import DarkModeSwitch from './DarkModeSwitch'

const CustomNavbar = () => {
  return (
    <Navbar variant='dark' bg='danger' expand='md'>
      <Container>
        <Navbar.Brand
          href='#home'
          className='navbar__brand position-relative text--accented'>
          recall
        </Navbar.Brand>
        <p className='navbar--collapsed__welcome mr-5 m-0 text-light d-md-none'>
          Hello, Vimal!
        </p>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Decks</Nav.Link>
            <Nav.Link href='#link' className='mr-2'>
              Create Deck
            </Nav.Link>
            <DarkModeSwitch />
          </Nav>
          <p className='navbar--expanded__welcome mr-5 m-0 text-light d-none d-md-block'>
            Hello, Vimal!
          </p>
          <div className='d-flex flex-column flex-md-row'>
            <Link
              to='/about'
              className='navbar__about d-flex mb-3 mt-2 my-md-0'>
              <i className='navbar__about__icon fas fa-question-circle text-light align-self-center mr-3' />
              <span className='sr-only'>About</span>
            </Link>
            <Link
              to='/login'
              className='btn btn sm btn-light text-danger px-3 mt-2 mt-md-0 w-100 w-md-auto'>
              Log In
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
