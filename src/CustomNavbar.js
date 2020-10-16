import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function CustomNavbar() {
  return (
    <Navbar variant='dark' bg='danger' expand='md'>
      <Container>
        <Navbar.Brand
          href='#home'
          className='navbar__brand position-relative accented'>
          recall
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Decks</Nav.Link>
            <Nav.Link href='#link'>Create Deck</Nav.Link>
          </Nav>
          <p className='mr-5 m-0 text-light'>Hello, Vimal!</p>
          <div className='d-flex flex-column flex-md-row'>
            <Link to='/about' className='d-flex my-2 my-md-0'>
              <i className='navbar__about__icon fas fa-question-circle text-light align-self-center mr-3' />
            </Link>
            <Button
              className='text-danger px-3 mt-2 mt-md-0 w-100 w-md-auto'
              variant='light'
              size='sm'>
              Log In
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
