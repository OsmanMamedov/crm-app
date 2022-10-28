import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompanySetting } from '../redux/actions/company_setting_ac'
import { crud, pageItem } from '../config/contants'
import { EditIcon, TrashIcon, ListIcon, GridIcon, SortIcon } from '../components/icons'
import { barListType, gridListType, companySettingType } from '../redux/action_types'
import { success } from "../redux/actions/loader_ac"
import { Modal, Popconfirm, message, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Pagination from '../components/UIElement/Pagination'
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import AntSelect from '../components/UIElement/AntSelect'
import Layout from "../components/Container/Layout"

export default function CompanySetting() {
    const dispatch = useDispatch();
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const loader = useSelector(state => state.loader)
    const result = useSelector(state => state.result)
    const trans = useSelector(state => state.trans)
    const companySetting = useSelector(state => state.companySetting)
    const [selectedPage, setSelectedPage] = useState(1)
    const [openDialog, setOpenDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [request, setRequest] = useState({ rowCount: 10, pageCount: 0, load: true, search: "", sort: "id", "desc": false, data: {} })

    useEffect(() => {
        dispatch(fetchCompanySetting(request, crud.list, {}))
    }, [])

    useEffect(() => {
        if (result.success === true) {
            setOpenDialog(false)
            dispatch(success(false))
        }
    }, [result.change])

    var fields = {
        id: 0,
        name: ''
    }
    const [field, setField] = useState(fields)

    var errors = {
        errName: ''
    }
    const [error, setError] = useState(errors)

    let validate = () => {
        if (field.name.length < 5) {
            setError({ ...error, errName: 'Kayıt çok kısa' });
            return false;
        }
        if (field.name.length > 30) {
            setError({ ...error, errName: 'Kayıt çok uzun' });
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
        dispatch(fetchCompanySetting({ ...request, sort: f, desc, load: false }, crud.list));
        setDesc(!desc)
    }

    const setSelectedPageFilter = (n) => {
        setSelectedPage(n)
        setRequest({ ...request, pageCount: n - 1 })
        dispatch(fetchCompanySetting({ ...request, pageCount: n - 1, load: false }, crud.list));
    }

    const seacrhItem = (text) => {
        if (text.length > 2)
            dispatch(fetchCompanySetting({ ...request, search: text, load: false }, crud.list))
    }

    const searchChangeKeyPress = (text, kcode) => {
        if (kcode === 8) { dispatch(fetchCompanySetting({ ...request, search: text, load: false }, crud.list)) }
    }

    const register = () => {
        if (validate()) {
            if (!isEdit)
                dispatch(fetchCompanySetting({}, crud.create, field));
            else {
                dispatch(fetchCompanySetting({}, crud.update, field));
            }
            setOpenDialog(false);
            setField(fields);
        }
    }

    const editItem = (e) => {
        setIsEdit(true);
        setOpenDialog(true);
        setField(e);
    }

    const confirm = (item) => {
        message.success(trans.successfullyDeleted);
        dispatch(fetchCompanySetting({ ...request, load: false }, crud.delete, item))
        let company = companySetting.list.filter((e) => {
            return e.id !== item.id
        })
        dispatch({ type: companySettingType, payload: company });
    }

    const option = [
        { value: 1, label: 'Yazılım' },
        { value: 2, label: 'İnşaat' },
        { value: 3, label: 'Tasarım' }
    ]

    const showPageItem = (e) => {
        dispatch(fetchCompanySetting({ ...request, rowCount: e }, crud.list, {}))
    }

    return (
        <Layout>
            <Modal
                title={trans.company}
                visible={openDialog}
                okText={trans.save}
                cancelText={trans.cancel}
                onOk={register}
                onCancel={() => setOpenDialog(false)}>
                <AntInput
                    value={field.name}
                    placeholder={trans.name}
                    onChange={e => setField({ ...field, name: e.target.value })}
                    message={error.errName} />
                <AntSelect
                    showSearch
                    header={trans.customerType}
                    options={option}
                    placeholder={trans.customerType} />
            </Modal>
            <div className='properties'>
                <div className='left'>
                    <AntSelect
                        defaultValue='10'
                        options={pageItem}
                        sizes='small'
                        width='70'
                        onChange={e => showPageItem(e)} />
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
                                    <th>{trans.settings}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companySetting && companySetting.list && companySetting.list.length > 0 && companySetting.list.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.name}</td>
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
                                    <th>{trans.name} <SortIcon color={theme === 'dark' ? '#f19ea6' : '#212529'} /></th>
                                    <th>{trans.settings}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='loader'>
                                    <td colSpan="7">
                                        <div className="loader-box">
                                            <Spin size="default"
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
                            {companySetting && companySetting.list && companySetting.list.length > 0 && companySetting.list.map((e, i) => {
                                return (
                                    <div className='col-4'>

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
