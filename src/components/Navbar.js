import React from 'react'
import {Link ,useLocation} from "react-router-dom";
import { useEffect } from 'react';
const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname);
    }, [location]);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">thinkPad</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <Link to="/login" className="btn btn-primary mx-3" role="button" aria-disabled="true">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-3" role="button" aria-disabled="true">SignUp</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar