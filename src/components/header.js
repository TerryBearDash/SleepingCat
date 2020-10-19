import React from 'react';
import HeaderImage from '../assets/img/header-logo.png'

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-light navbar-expand-md bg-white">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src={HeaderImage} alt="logo" />
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;