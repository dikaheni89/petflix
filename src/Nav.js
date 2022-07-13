import React, { useState, useEffect } from 'react';
import './css/Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        const show = (e) => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        };
        window.addEventListener('scroll', show);
        return () => {
            window.removeEventListener('scroll', show);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className='nav__logo'
                src={process.env.PUBLIC_URL + "/logo/petflix.png"}
                alt="Petflix"
            />
        </div>
    )
}

export default Nav