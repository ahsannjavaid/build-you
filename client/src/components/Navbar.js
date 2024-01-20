import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className='container'>
                    <Link to={"/"}>
                        <img src='/images/logo0.0.png' alt='logo' height='26px' width='100px' />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-item nav-link" to={"/login"}>LOGIN</Link>
                            <Link className="nav-item nav-link" to={"/signup"}>SIGN UP</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar