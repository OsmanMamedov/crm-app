import React from 'react'
import { useSelector } from "react-redux"

function ContentHeader() {
    const current = useSelector(state => state.current);

    return (
        <div className="content-header">
            <div className="container-fuild">
                <div className="row">
                    <div className="header-item">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">{current.title}</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default ContentHeader
