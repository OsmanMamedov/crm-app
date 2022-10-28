import React from 'react'
import { Select } from 'antd'

export default function AntSelect({
    options,
    header,
    message,
    disabled,
    onChange,
    showSearch,
    placeholder,
    defaultValue,
    sizes,
    width }) {

    const { Option } = Select;
    return (
        <div className='input-group'>
            {header ?
                <span className='title'>{header}</span>
                :
                null
            }
            <Select
                style={width ? { minWidth: width } : { minWidth: 120 }}
                size={sizes}
                defaultValue={defaultValue}
                showSearch={showSearch}
                placeholder={placeholder}
                optionFilterProp="children"
                onChange={onChange}
                disabled={disabled}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {options && options.map((e, i) => {
                    return (
                        <Option key={i} value={e.value}>{e.label}</Option>
                    )
                })}
            </Select>
            {message ?
                <span className='messages'>{message}</span>
                :
                null
            }
        </div>
    )
}
