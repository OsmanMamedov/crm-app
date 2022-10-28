import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/actions/users_ac'
import { crud, pageItem } from '../config/contants'
import { EditIcon, TrashIcon, ListIcon, GridIcon, SortIcon } from '../components/icons'
import { barListType, gridListType, usersType } from '../redux/action_types'
import { success } from "../redux/actions/loader_ac"
import { Popconfirm, message, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import man from '../images/man.png'
import { baseUrl } from '../config/index'
import Layout from "../components/Container/Layout"
import Pagination from '../components/UIElement/Pagination'
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import AntSwitch from '../components/UIElement/AntSwitch'
import AntModal from '../components/UIElement/AntModal'
import AntSelect from '../components/UIElement/AntSelect'
import AntDatePicker from '../components/UIElement/AntDatePicker'
import Avatar from '../components/UIElement/Avatar'

export default function UserManagement() {
    const dispatch = useDispatch();
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const loader = useSelector(state => state.loader)
    const result = useSelector(state => state.result)
    const trans = useSelector(state => state.trans)
    const users = useSelector(state => state.users)
    const [selectedPage, setSelectedPage] = useState(1)
    const [openDialog, setOpenDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [request, setRequest] = useState({ rowCount: 10, pageCount: 0, load: true, search: "", sort: "id", "desc": false, data: {} })

    useEffect(() => {
        dispatch(fetchUsers(request, crud.list, {}))
    }, [])

    useEffect(() => {
        if (result.success === true) {
            setOpenDialog(false)
            dispatch(success(false))
        }
    }, [result.change])

    var fields = {
        id: 0,
        name: '',
        surname: '',
        phone: '',
        photo: '',
        birthDate: new Date(),
        email: '',
        gender: false,
        password: '',
        passwordComfirm: ''
    }
    const [field, setField] = useState(fields)

    var errors = {
        errName: '',
        errSurname: '',
        errPhone: '',
        errBirthDate: '',
        errEmail: '',
        errPassword: '',
        errPasswordComfirm: ''
    }
    const [error, setError] = useState(errors)

    let validate = () => {
        if (field.name.length < 3) {
            setError({ ...error, errName: 'Kayıt çok kısa' });
            return false;
        }
        if (field.name.length > 30) {
            setError({ ...error, errName: 'Kayıt çok uzun' });
            return false;
        }
        if (field.surname.length < 3) {
            setError({ ...error, errSurname: 'Kayıt çok kısa' });
            return false;
        }
        if (field.surname.length > 30) {
            setError({ ...error, errSurname: 'Kayıt çok uzun' });
            return false;
        }
        if (field.phone.length < 11 || field.phone.length > 11) {
            setError({ ...error, errPhone: 'Geçersiz telefon' });
            return false;
        }
        if (!field.email.includes('@')) {
            setError({ ...error, errEmail: 'Geçersiz email' });
            return false;
        }
        if (field.password.length < 5) {
            setError({ ...error, errPassword: 'Şifre çok kısa' });
            return false;
        }
        if (field.password !== field.passwordComfirm) {
            setError({ ...error, errPasswordComfirm: 'Şifreler eşit değil' });
            return false;
        }

        return true;
    }

    const showGrid = () => {
        dispatch({ type: gridListType })
    }

    const showBar = () => {
        dispatch({ type: barListType })
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

    const seacrhItem = (text) => {
        if (text.length > 2) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const searchChangeKeyPress = (text, kcode) => {
        if (kcode === 8) dispatch(fetchUsers({ ...request, search: text, load: false }, crud.list))
    }

    const register = () => {
        if (validate()) {
            if (!isEdit)
                dispatch(fetchUsers({}, crud.create, field));
            else {
                dispatch(fetchUsers({}, crud.update, field));
            }
            setOpenDialog(false);
            setField(fields);
        }
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

    const changeImage = url => {
        setField({ ...field, photo: url.replace('data:image/jpeg;base64,', '') })
    }

    const showPageItem = (e) => {
        setRequest({ ...request, rowCount: e })
        dispatch(fetchUsers(request, crud.list, {}))
    }

    return (
        <Layout>
            <AntModal
                width={375}
                title={trans.newUser}
                visible={openDialog}
                okText={trans.save}
                cancelText={trans.cancel}
                onOk={register}
                onCancel={() => setOpenDialog(false)}>
                <Avatar changeUrl={changeImage} defaultImg={field.photo !== '' ? baseUrl + field.photo : man} />
                <AntInput
                    header={trans.name}
                    value={field.name}
                    placeholder={trans.name}
                    onChange={e => setField({ ...field, name: e.target.value })}
                    message={error.errName} />
                <AntInput
                    header={trans.surname}
                    value={field.surname}
                    placeholder={trans.surname}
                    onChange={e => setField({ ...field, surname: e.target.value })}
                    message={error.errSurname} />
                <AntDatePicker
                    header={trans.birthDate}
                    defaultValue={field.birthDate}
                    dateFormat='DD-MM-YYYY'
                    onChange={date => setField({ ...field, birthDate: date._d })}
                    message={error.errBirthDate} />
                <AntInput
                    type={'email'}
                    header={trans.email}
                    value={field.email}
                    placeholder={trans.email}
                    onChange={e => setField({ ...field, email: e.target.value })}
                    message={error.errEmail} />
                <AntInput
                    type={'tel'}
                    header={trans.phone}
                    value={field.phone}
                    placeholder={trans.phone}
                    onChange={e => setField({ ...field, phone: e.target.value })}
                    message={error.errPhone} />
                <AntInput
                    type={'password'}
                    header={trans.password}
                    value={field.password}
                    placeholder={trans.password}
                    onChange={e => setField({ ...field, password: e.target.value })}
                    message={error.errPassword} />
                <AntInput
                    type={'password'}
                    header={trans.passwordComfirm}
                    value={field.passwordComfirm}
                    placeholder={trans.passwordComfirm}
                    onChange={e => setField({ ...field, passwordComfirm: e.target.value })}
                    message={error.errPasswordComfirm} />
            </AntModal>
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
                                    <th>{trans.photo}</th>
                                    <th onClick={() => sortByField("name")}>{trans.nameSurname} <SortIcon color={'#1890ff'} /></th>
                                    <th>{trans.phone}</th>
                                    <th>{trans.birthDate}</th>
                                    <th>{trans.email}</th>
                                    <th>{trans.status}</th>
                                    <th>{trans.settings}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.list && users.list.length > 0 && users.list.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='img-content'>
                                                <img src={e.photo === null ? man : baseUrl + e.photo} className='img profile-img' />
                                            </td>
                                            <td>{e.name + ' ' + e.surname}</td>
                                            <td>{e.phone}</td>
                                            <td>{e.birthDateString}</td>
                                            <td>{e.email}</td>
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
                                    <th>{trans.photo}</th>
                                    <th onClick={() => sortByField("name")}>{trans.nameSurname} <SortIcon color={'#1890ff'} /></th>
                                    <th>{trans.phone}</th>
                                    <th>{trans.birthDate}</th>
                                    <th>{trans.email}</th>
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