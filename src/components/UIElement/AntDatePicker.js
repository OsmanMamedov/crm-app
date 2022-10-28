import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';

export default function AntDatePicker(
    { header,
        defaultValue,
        id,
        placeholder,
        onChange,
        message,
        type,
        showTime,
        dateFormat
    }) {
    return (
        <div className='input-group'>
            {header ?
                <span className='title'>{header}</span>
                :
                null
            }
            <DatePicker
                locale={locale}
                id={id}
                onChange={onChange}
                picker={type}
                defaultValue={moment(defaultValue, dateFormat)}
                placeholder={placeholder}
                showTime={showTime}
                showToday
                clearIcon={false}
                format={dateFormat} />
            {message ?
                <span className='messages'>{message}</span>
                :
                null
            }
        </div>
    )
}