import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from "../components/Container/Layout"
import AntCalendar from '../components/UIElement/AntCalendar'
import AndModal from '../components/UIElement/AntModal'
import { Badge } from 'antd'

export default function Calendar() {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const trans = useSelector(state => state.trans)

    const register = () => { }
    const openCalendarForm = e => {
        setIsOpenForm(true);
        console.log(e);
    }

    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'success', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    return (
        <Layout>
            <AndModal
                width={350}
                title={trans.newUser}
                visible={isOpenForm}
                okText={trans.save}
                cancelText={trans.cancel}
                onOk={register}
                onCancel={() => setIsOpenForm(false)}>

            </AndModal>
            <AntCalendar
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                onSelect={e => openCalendarForm(e)} />
        </Layout>
    )
}
