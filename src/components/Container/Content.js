import React from 'react'
import { useSelector } from "react-redux"
import ContentHeader from "./ContentHeader"

function Content(props) {
    const { children } = props
    const current = useSelector(state => state.current)

    return (
        <div className={localStorage.sidebar !== null ?
            (localStorage.sidebar === "false" ? 'container-width page-container' : 'page-container')
            :
            (current.leftMenu ? 'container-width page-container' : 'page-container')}>
            <ContentHeader />
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Content
