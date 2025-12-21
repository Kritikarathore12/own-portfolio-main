import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-info">
                    <p>&copy; {new Date().getFullYear()} Kritika Rathore. All Rights Reserved.</p>
                    <p className="credit">Designed & Developed with ❤️</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
