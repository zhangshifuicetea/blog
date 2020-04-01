import React from 'react';
import HeaderSearch from './HeaderSearch';
import UserInfo from './UserInfo';
import Navbar from './Navbar';

export const WebHeaderRight = () => {
    return (
        <div className='header-right'>
            <HeaderSearch />
            <UserInfo/>
            <Navbar/>
        </div>
    )
};

export default WebHeaderRight;
