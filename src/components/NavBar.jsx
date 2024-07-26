import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/NavBar.css';
import facade from '../util/apiFacade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const isLoggedIn = facade.getToken() !== null;
  const userRoles = facade.getUserRoles();

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    facade.logout(() => {
      window.location.reload(); // Refresh page after logout
    });
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="sticky-top-navbar">
        <Navbar.Brand href="/">Mini Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" in={expanded}>
          <Nav className="ml-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <LinkContainer to="/login" onClick={() => setExpanded(false)}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <LinkContainer to="/images" onClick={() => setExpanded(false)}>
                <Nav.Link>Images</Nav.Link>
              </LinkContainer>
            )}
            {userRoles.includes('user') && (
              <LinkContainer to="/savedImg" onClick={() => setExpanded(false)}>
                <Nav.Link>Saved Images</Nav.Link>
              </LinkContainer>
            )}
            {userRoles.includes('admin') && (
              <LinkContainer to="/admin/users" onClick={() => setExpanded(false)}>
                <Nav.Link>Admin Users</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <NavDropdown title="Logout" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  Confirm logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
