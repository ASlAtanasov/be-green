import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <Navbar className='navigation'>
            <Container fluid className='navigation-container'>
                <Navbar.Brand className='navigation-container-span' to="/"><Link className='navigation-container-span-a' to="/">BE GREEN</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className='navigation-navbar-collapse' id="navbarScroll">
                    <Nav
                        className="my-2 my-lg-0 navigation-buttons"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link to="/body">Body</Link></Nav.Link>
                        <Nav.Link><Link to="/foods">Foods</Link></Nav.Link>
                        <Nav.Link><Link to="/nature">Nature</Link></Nav.Link>
                        <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button className='navigation-form-button' variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;