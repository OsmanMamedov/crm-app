import React, { useDemo } from 'react'
import { useSelector } from "react-redux"
import Select from 'react-select'
import makeAnimated from "react-select/animated"

export default function SelectBox({ color, options, defaultValue, isMulti, closeMenuOnSelect, header, placeholder, message }) {
    const animatedComponents = makeAnimated();
    const theme = useSelector(state => state.theme)

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: color,
            border: '0px',
            "&:hover": {
                cursor: 'pointer'
            }
        }),
    }

    return (
        <div className="select-container">
            <label className="select-header">{header}</label>
            <div className="select-group">
                <Select
                    options={options}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    isMulti={isMulti}
                    closeMenuOnSelect={closeMenuOnSelect}
                    components={animatedComponents}
                    styles={customStyles}
                />
            </div>
            <span className="select-message">{message}</span>
        </div>
    )
}