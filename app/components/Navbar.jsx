import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav>
        <h3>Margaret Hamilton Interplanetary Academy of JavaScript</h3>
        <Link to="/">
            <button className='btn btn-info'>Home</button>
        </Link>
        <button className='btn btn-info'>Students</button>
      </nav>
           
    )
}

export default Navbar;