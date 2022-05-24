import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { useProductsContext } from '../../contexts/ProductsContext';
import { getAll } from '../../services/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faShoppingBag } from '@fortawesome/fontawesome-free-solid';

//import { signOutPage } from '../../services/authService';
import { useNavigate } from 'react-router';

import './Header.css';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';

const Header = () => {
    const { user, setUser, logout } = useAuthUserContext();
    const { products, setProducts, setProductsToDisplay } = useProductsContext();
    const { orderedProducts, setOrderedProducts } = useOrderedProductsContext();

    //const navigate = useNavigate()
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
    let numberOfOrderedProducts = 0;

    //console.log("orderedProducts in Header: " + orderedProducts);

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        let orderedProductsInLocalstorage = JSON.parse(localStorage.getItem('orderedProducts'));
        console.log('orderedProducts in Header useEffect: ' + orderedProducts);
        if (currentUser) {
            setUser(currentUser);
        }
        if(orderedProductsInLocalstorage) {
           setOrderedProducts([...orderedProductsInLocalstorage]);
        }
    }, []);

    const loggedUser = (
        <>
            {user?.uid === '2CLGcFqcCASXAdKXb0HHAz7neIj1'
                ? <Link to="/create">Create</Link>
                : ''}
            <Link to="/">Home</Link>
            <Link to="/body">Body</Link>
            <Link to="/foods">Foods</Link>
            <Link to="/nature">Nature</Link>
            <Link to="/logout">Logout</Link>
        </>
    );

    const guest = (
        <>
            <Link to="/">Home</Link>
            <Link to="/body">Body</Link>
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

                        <Link to="/cart" className='navigation-cart-link'>
                            <svg className='navigation-cart-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
                            <p className={`navigation-cart-link-circle ${orderedProducts.length == 0 ? 'no-dot' : 'show-dot'}`}>{orderedProducts.length}</p>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;