import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import './Navbar.css';

export default function Navbar() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleClick = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link to = '/' className = 'navbar-brand department'>BSMRSTU <span className = ''>PHYSICS</span> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        {
                            loggedInUser.token ?
                            <ul className="navbar-nav navbar-items ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to ='/profile' className = 'nav-link'>Students</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick = {handleClick} className = 'btn logout '>Logout</button>
                                </li>
                            </ul> :
                            <ul className="navbar-nav navbar-items ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to ='/signup' className = 'nav-link'>Registration</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to ='/login' className = 'nav-link'>Log In</NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
    )
}
