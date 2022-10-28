import React from 'react'
import { Switch } from 'antd';

export default function AntSwitch({ checked, onChange, id, leftText, rightText, sizes, checkedChildren, unCheckedChildren }) {
    return (
        <div className="toggle-button">
            {
                leftText !== null && leftText !== "" && leftText !== undefined ?
                    <span className='left-text'>{leftText}</span>
                    :
                    null
            }
            <Switch
                id={id}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                defaultChecked={checked}
                onChange={onChange}
                size={sizes} />
            {
                rightText !== null && rightText !== "" && rightText !== undefined ?
                    <span className='right-text'>{rightText}</span>
                    :
                    null
            }
        </div>
    )
}
