import React from 'react';
import FooterImage from '../assets/img/header-logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="container d-flex align-items-center">
                <img alt="logo" src={FooterImage} />
                <p><small>Copyright sleeping cat 2020</small></p>
            </div>
        </footer>
    )
}

export default Footer;