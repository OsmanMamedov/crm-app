import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from "../components/Container/Layout"
import ContentLoader from "react-content-loader"
import { fetchCustomerType } from '../redux/actions/customer_type_ac'
import { crud } from '../config/contants'
import { EditIcon, TrashIcon, ListIcon, GridIcon, SortIcon, PlusIcon } from '../components/icons'
import { barListType, gridListType, customerTypes } from '../redux/action_types'
import { success } from "../redux/actions/loader_ac"
import { Modal, Popconfirm, message, Calendar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Pagination from '../components/UIElement/Pagination'
import AntButton from '../components/UIElement/AntButton'
import AntInput from '../components/UIElement/AntInput'
import ProductCard from '../components/UIElement/ProductCard'

export default function Home() {
    const dispatch = useDispatch();
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const loader = useSelector(state => state.loader)
    const result = useSelector(state => state.result)
    const trans = useSelector(state => state.trans)
    const customerType = useSelector(state => state.customerType)
    const [openDialog, setOpenDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedPage, setSelectedPage] = useState(1)
    const [request, setRequest] = useState({ rowCount: 9, pageCount: 0, load: true, search: "", sort: "id", "desc": false, data: {} })

    // useEffect(() => {
    //     dispatch(fetchCustomerType(request, crud.list, {}))
    // }, [])

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

    const register = () => {
        if (validate()) {
            if (!isEdit)
                dispatch(fetchCustomerType({}, crud.create, field));
            else {
                dispatch(fetchCustomerType({}, crud.update, field));
            }
            setOpenDialog(false);
        }
    }

    const editItem = (e) => {
        setIsEdit(true);
        setOpenDialog(true);
        setField(e);
    }

    const seacrhItem = (text) => {
        if (text.length > 0)
            dispatch(fetchCustomerType({ ...request, search: text, load: false }, crud.list))
        else
            dispatch(fetchCustomerType({ ...request, load: false }, crud.list))
    }

    const [desc, setDesc] = useState(false)
    const sortByField = (f) => {
        setRequest({ ...request, sort: f, desc })
        dispatch(fetchCustomerType({ ...request, sort: f, desc, load: false }, crud.list));
        setDesc(!desc)
    }

    const setSelectedPageFilter = (n) => {
        setSelectedPage(n)
        setRequest({ ...request, pageCount: n - 1 })
        dispatch(fetchCustomerType({ ...request, pageCount: n - 1, load: false }, crud.list));
    }

    function confirm(item) {
        message.success('Click on Yes');
        dispatch(fetchCustomerType({ ...request, load: false }, crud.delete, item))
        let customers = customerType.list.filter((e) => {
            return e.id !== item.id
        })
        dispatch({ type: customerTypes, payload: customers });
    }

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
        <Layout>
            <div className="home"></div>
        </Layout>
    )
}
