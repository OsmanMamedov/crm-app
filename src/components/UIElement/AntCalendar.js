import React from 'react'
import { Calendar } from 'antd';

export default function AntCalendar({
    onSelect,
    dataCellRender,
    monthCellRender }) {
    return (
        <Calendar
            onSelect={onSelect}
            dataCellRender={dataCellRender}
            monthCellRender={monthCellRender} />
    )
}
