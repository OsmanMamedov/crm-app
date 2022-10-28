import React from 'react'
import { Input } from 'antd'

export default function AntInput(
    { header,
        value,
        id,
        placeholder,
        onChange,
        onKeyUp,
        onKeypress,
        onKeydown,
        sizes,
        message,
        icon,
        readOnly,
        type
    }) {
    return (
        <div className='input-group'>
            {header ?
                <span className='title'>{header}</span>
                :
                null
            }
            <Input
                className={`${message ? 'error' : ''}`}
                id={id}
                value={value}
                type={type}
                placeholder={placeholder}
                size={sizes}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onKeyPress={onKeypress}
                onKeyDown={onKeydown}
                readOnly={readOnly}
                prefix={icon}
            />
            {message ?
                <span className='messages'>{message}</span>
                :
                null
            }
        </div>
    )
}