import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../redux/actions/users_ac'
import { crud, pageItem } from '../../config/contants'
import { barListType, gridListType, usersType } from '../../redux/action_types'
import { EditIcon, TrashIcon, ListIcon, GridIcon, SortIcon } from '../../components/icons'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import AntSelect from '../../components/UIElement/AntSelect'
import AntButton from '../../components/UIElement/AntButton'
import AntInput from '../../components/UIElement/AntInput'
import Layout from "../../components/Container/Layout"
import AntSwitch from '../../components/UIElement/AntSwitch'
import Pagination from '../../components/UIElement/Pagination'
import man from '../../images/man.png'
import { baseUrl } from '../../config/index'
import { Popconfirm, message, Spin } from 'antd';

export default function Authorization() {

    const dispatch = useDispatch();
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const loader = useSelector(state => state.loader)
    const trans = useSelector(state => state.trans)
    const users = useSelector(state => state.users)
    const [selectedPage, setSelectedPage] = useState(1)
    const [openDialog, setOpenDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [request, setRequest] = useState({ rowCount: 10, pageCount: 0, load: true, search: "", sort: "id", "desc": false, data: {} })

    var fields = {
        id: 0,
        name: '',
        surname: '',
    }
    const [field, setField] = useState(fields)

    const showGrid = () => {
        dispatch({ type: gridListType })
    }

    const showBar = () => {
        dispatch({ type: barListType })
    }

    const showPageItem = (e) => {
        setRequest({ ...request, rowCount: e })
        dispatch(fetchUsers(request, crud.list, {}))
    }

    const seacrhItem = (text) => {
        if (text.length > 2) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const searchChangeKeyPress = (text, kcode) => {
        if (kcode === 8) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const [desc, setDesc] = useState(false)
    const sortByField = (f) => {
        setRequest({ ...request, sort: f, desc })
        dispatch(fetchUsers({ ...request, sort: f, desc, load: false }, crud.list));
        setDesc(!desc)
    }

    const setSelectedPageFilter = (n) => {
        setSelectedPage(n)
        setRequest({ ...request, pageCount: n - 1 })
        dispatch(fetchUsers({ ...request, pageCount: n - 1, load: false }, crud.list));
    }

    const changeStatus = (a, e) => {
        let updateItem = {};
        for (let index = 0; index < users.list.length; index++) {
            const selectedItem = users.list[index];
            if (selectedItem.id === e.id) {
                users.list[index].status = a;
                updateItem = users.list[index];
            }
        }
        dispatch({ type: usersType, payload: users.list })
        dispatch(fetchUsers({}, crud.update, updateItem));
    }

    const editItem = (e) => {
        setIsEdit(true);
        setOpenDialog(true);
        setField({
            ...e,
            password: '&&&&&&&&',
            passwordComfirm: '&&&&&&&&'
        });
    }

    const confirm = (item) => {
        message.success(trans.successfullyDeleted);
        dispatch(fetchUsers({ ...request, load: false }, crud.delete, item))
        let user = users.list.filter((e) => {
            return e.id !== item.id
        })
        dispatch({ type: usersType, payload: user });
    }

    return (
        <Layout>
            <div className='properties'>
                <div className='left'>
                    <AntSelect
                        defaultValue='10'
                        options={pageItem}
                        sizes='small'
                        width='70'
                        onChange={e => showPageItem(e.value)} />
                    <div className='view-button'>
                        <button onClick={showBar}>
                            <ListIcon color={current.bar
                                ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)")
                                : (theme === "dark" ? "#e5e5e5" : "#5d5d5d")} />
                        </button>
                        <button onClick={showGrid}>
                            <GridIcon color={current.grid
                                ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)")
                                : (theme === "dark" ? "#e5e5e5" : "#5d5d5d")} />
                        </button>
                    </div>
                </div>
                <div className='right'>
                    <AntInput
                        icon={<SearchOutlined />}
                        placeholder={trans.search}
                        onChange={e => seacrhItem(e.target.value)}
                        onKeyUp={e => searchChangeKeyPress(e.target.value, e.keyCode)} />
                    <AntButton
                        icons={<PlusOutlined />}
                        content={trans.add}
                        types='primary'
                        onClick={() => setOpenDialog(true)} />
                </div>
            </div>
            {current.bar
                && (!loader.loading ?
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th onClick={() => sortByField("name")}>{trans.name} <SortIcon color={'#1890ff'} /></th>
                                    <th>{trans.status}</th>
                                    <th>{trans.settings}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.list && users.list.length > 0 && users.list.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.name}</td>
                                            <td>
                                                <AntSwitch
                                                    checked={e.status}
                                                    onChange={(a) => changeStatus(a, e)}
                                                    sizes='small' />
                                            </td>
                                            <td>
                                                <button className='setting' onClick={() => editItem(e)}>
                                                    <EditIcon color={theme === 'dark' ? "#8dd0ff" : "#1890ff"} />
                                                </button>
                                                <Popconfirm
                                                    title={trans.doYouWantToDelete}
                                                    onConfirm={() => confirm(e)}
                                                    okText={trans.yes}
                                                    okType='danger'
                                                    cancelText={trans.cancel}>
                                                    <button className='setting'>
                                                        <TrashIcon color={theme === 'dark' ? "#f19ea6" : "#ff7875"} />
                                                    </button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {current && current.pageCount > 0 &&
                            <Pagination
                                setSelectedPage={setSelectedPageFilter}
                                selectedPage={selectedPage} />}
                    </div>
                    :
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th onClick={() => sortByField("name")}>{trans.name} <SortIcon color={'#1890ff'} /></th>
                                    <th>{trans.status}</th>
                                    <th>{trans.settings}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="loader">
                                    <td colSpan="7">
                                        <div className="loader-box">
                                            <Spin size="large"
                                                tip={trans.loading}>
                                            </Spin>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
            {current.grid
                && (!loader.loading ?
                    <div className='item-container'>
                        <div className='row-item'>
                            {users && users.list && users.list.length > 0 && users.list.map((e, i) => {
                                return (
                                    <div className='col-4' key={i}>
                                        <div className="card-container">
                                            <div className='operation-container'>
                                                <button className="operation-btn" onClick={() => editItem(e)}>
                                                    <EditIcon color={theme === 'dark' ? "#8dd0ff" : "#1890ff"} />
                                                </button>
                                                <Popconfirm
                                                    title={trans.doYouWantToDelete}
                                                    onConfirm={() => confirm(e)}
                                                    okText={trans.yes}
                                                    okType='danger'
                                                    cancelText={trans.cancel}>
                                                    <button className="operation-btn">
                                                        <TrashIcon color={theme === 'dark' ? "#f19ea6" : "#ff7875"} />
                                                    </button>
                                                </Popconfirm>
                                            </div>
                                            <img className="round" src={e.photo === null ? man : baseUrl + e.photo} alt="user" />
                                            <h3 className='title'>{e.name + ' ' + e.surname}</h3>
                                            <div className='roles'>
                                                <span className="role">Software Developer</span>
                                                <span className="role">Admin</span>
                                            </div>
                                            <div className='email'>{e.email}</div>
                                            <div className="buttons">
                                                <button className="setting-btn">
                                                    <span className='status-text'>{trans.status}</span>
                                                    <AntSwitch
                                                        checked={e.status}
                                                        sizes='small' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {current && current.pageCount > 0 &&
                            <Pagination
                                setSelectedPage={setSelectedPageFilter}
                                selectedPage={selectedPage} />}
                    </div>
                    :
                    null
                )}
        </Layout>
    )
}
