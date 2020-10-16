import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

function CustomNavbar() {
  return (
    <Navbar variant='dark' bg='danger' expand='lg'>
      <Container>
        <Navbar.Brand href='#home' className='navbar__brand accented'>
          recall
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Decks</Nav.Link>
            <Nav.Link href='#link'>Create Deck</Nav.Link>
          </Nav>
          <div>
            <Button variant='light' size='sm'>
              Log In
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
