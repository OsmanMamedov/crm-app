import React from 'react'

export default function Toggle({ value, checked, onChange, id, leftText, rightText, classes }) {
    return (
        <div className="toggle-button">
            {
                leftText !== null && leftText !== "" && leftText !== undefined ?
                    <span>{leftText}</span>
                    :
                    null
            }
            <label className="switch">
                <input type="checkbox" id={id} checked={checked} value={value} onChange={onChange} />
                <span className={classes ? classes + 'toggle-slider rounded' : 'toggle-slider rounded'} />
            </label>
            {
                rightText !== null && rightText !== "" && rightText !== undefined ?
                    <span>{rightText}</span>
                    :
                    null
            }
        </div>
    )
}
