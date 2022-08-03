import React, { useState, useEffect } from 'react';
import './Header.scss';
import LogoIcon from '../../assets/Logo.svg'

const Header = (props: any) => {
    const { } = props

    return (
        <div className="header-wrapper">
            <img src={LogoIcon} alt="Logo" />
        </div>
    )
}

export default Header;