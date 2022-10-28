import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { isLightType, isDarkType, leftMenuType } from "../../redux/action_types"
import { MenuIcon } from '../icons'
import AntSwitch from '../UIElement/AntSwitch'
import AntSelect from '../UIElement/AntSelect'
import { Select } from 'antd'

function Navbar() {
    const current = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)
    const trans = useSelector(state => state.trans)
    const dispatch = useDispatch();
    const { Option } = Select;

    const changeTheme = (e) => {
        if (e) {
            dispatch({ type: isDarkType })
            animate();
            localStorage.setItem("theme", "dark")
        }
        else {
            dispatch({ type: isLightType })
            animate();
            localStorage.setItem("theme", "light")
        }
    }

    const showMenu = () => {
        localStorage.setItem("sidebar", localStorage.sidebar === "false" ? "true" : "false")
        dispatch({ type: leftMenuType, payload: !current.leftMenu })
        animate();
    }

    const animate = () => {
        document.documentElement.classList.add("transition")
        setTimeout(() => {
            document.documentElement.classList.remove("transition")
        }, 1000);
    }

    const langOption = [
        { value: 'tr', label: trans.tr },
        { value: 'ru', label: trans.ru },
        { value: 'en', label: trans.en }
    ]

    const changeLang = (lng) => {
        dispatch({ type: lng });
        localStorage.setItem("lang", lng);
    }

    return (
        <>
            <div className={localStorage.sidebar !== null ?
                (localStorage.sidebar === "false" ? 'navbar close' : 'navbar')
                :
                (current.leftMenu ? 'navbar close' : 'navbar')}>
                <div className="navbar-left-item">
                    <a onClick={() => showMenu()}>
                        <MenuIcon color={theme === "dark" ? "#e5e5e5" : "#5d5d5d"} />
                    </a>
                    <h2>{current.title}</h2>
                </div>
                <div className="navbar-right-item">
                    <div className='input-group'>
                        <AntSelect
                            defaultValue={localStorage.lang}
                            options={langOption}
                            sizes={'small'}
                            onChange={(e) => changeLang(e)} />
                    </div>
                    <AntSwitch
                        checked={localStorage.theme === "light" ? false : true}
                        onChange={e => changeTheme(e)}
                        rightText={theme === "light" ? trans.lightMode : trans.darkMode}
                        checkedChildren='D'
                        unCheckedChildren='L' />
                </div>
            </div>
        </>
    )
}

export default Navbar
