import React from 'react';
import {Link} from 'react-router-dom'

export default function Navbar () {
    return (
        <nav>
            <h3>Spot-Me</h3>
            <Link to="/profile">
                <button className='btn btn-info'>My Profile</button>
            </Link>
            <Link to="/chats">
                <button className='btn btn-info'>Chats</button>
            </Link>   
            <Link to="/friends">
                <button className='btn btn-info'>Friends</button>
            </Link>
            <Link to="/find">
                <button className='btn btn-info'>Find Friends</button>
            </Link>
      </nav>

    )
}