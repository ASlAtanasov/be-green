import React, { useEffect} from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { useProductsContext } from '../../contexts/ProductsContext';
import { getAll} from '../../services/productService';
//import { signOutPage } from '../../services/authService';
//import { useNavigate } from 'react-router';

import './Header.css';

const Header = () => {

    const { user, setUser, logout } = useAuthUserContext();
    const { products, setProducts, setProductsToDisplay } = useProductsContext();

    // const navigate = useNavigate()
    // const logoutHandler = async () => {
    //     try {
    //         await signOutPage();
    //         localStorage.removeItem('user');
    //          logout();
    //         navigate('/home');
    //         alert('You signed out successfully')
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
            console.log('currentUser in Header useEffect: ' + currentUser);
            console.log('currentUser id Header useEffect: ' + currentUser.uid);
            console.log('currentUser email Header useEffect: ' + currentUser.email);
        
            if(currentUser) {
                setUser(currentUser);
            }
   
        }, []);

    const onClickGetAllHandler = () => {
        console.log('Body getAll func');
        getAll(products, setProducts, setProductsToDisplay);
    }

    const loggedUser = (
        <>
            {user && user.uid && user.uid === '2CLGcFqcCASXAdKXb0HHAz7neIj1'
                ? <Link to="/create">Create</Link>
                : ''}
            <Link to="/">Home</Link>
            <Link to="/body" onClick={onClickGetAllHandler}>Body</Link>
            <Link to="/foods">Foods</Link>
            <Link to="/nature">Nature</Link>
            <Link to="/logout" /*onClick={logoutHandler}*/>Logout</Link>
        </>
    );

    const guest = (
        <>
            <Link to="/">Home</Link>
            <Link to="/body" onClick={onClickGetAllHandler}>Body</Link>
            <Link to="/foods">Foods</Link>
            <Link to="/nature">Nature</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </>
    );

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
                        {user
                            ? loggedUser
                            : guest
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;