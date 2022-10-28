import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftMenu from "./LeftMenu";
import Navbar from "./Navbar";
import Content from "./Content";
import { Button } from "primereact/button"
import { TurkishIcon, RussiaIcon, UnitedStateIcon, ThemeIcon, SettingsIcon } from '../icons'

function Layout(props) {
    const dispatch = useDispatch();
    const { children } = props;

    return (
        <div className="layout">
            <Navbar />
            <LeftMenu />
            <Content children={children} />
        </div>
    )
}

export default Layout
