import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { breadcrumbType, pageTitleType, addBreadcrumbType } from '../../redux/action_types'
import { Link } from 'react-router-dom'
import { SidebarData } from "./SidebarData";
import { HomeIcon, UsersIcon, CustomerIcon, CalendarIcon, CompanyIcon, DefinitionIcon, DownIcon, SettingsIcon } from '../icons'

export default function LeftMenu() {
    const dispatch = useDispatch();
    const trans = useSelector(state => state.trans)
    const theme = useSelector(state => state.theme)
    const { breadcrumbs } = useSelector(state => state.current)

    const getBreadcrumb = (i, path, name, isSubs, activePath) => {
        if (breadcrumbs.some(b => b.name === name)) { }
        else if (!isSubs) {
            dispatch({ type: breadcrumbType, payload: [{ name, path, activePath }] })
            dispatch({ type: pageTitleType, payload: name })
        }

        if (!isSubs)
            setMenuActive(path)
    }

    const setMenuActive = (path) => {
        SidebarData.map(x => x.active = false)
        SidebarData.filter(a => a.path !== path).map(x => x.subOpen = false)
        SidebarData.find(x => x.path === path).active = true;
        SidebarData.find(x => x.path === path).subOpen = !(SidebarData.find(x => x.path === path).subOpen)

        console.log(SidebarData);
    }

    const icon = (path, active) => {
        switch (path) {
            case "/home":
                return <HomeIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/user-management":
                return <UsersIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/customer-management":
                return <CustomerIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/calendar":
                return <CalendarIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/company-setting":
                return <CompanyIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/definitions":
                return <DefinitionIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            case "/settings":
                return <SettingsIcon color={active ? (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") : (theme === "dark" ? "#e5e5e5" : "#555")} />
            default:
                break;
        }
    }

    const setActiveSubMenu = (i, path) => {
        SidebarData.find(x => x.path === path).subs.map(s => s.active = false);
        SidebarData.find(x => x.path === path).subs[i].active = true;
        SidebarData.find(x => x.path === path).subOpen = (SidebarData.find(x => x.path === path).subOpen === true ? false : true)
    }

    return (
        <div className={localStorage.sidebar === "false" ? 'nav-menu close' : 'nav-menu'}>
            <div className="navbar-toggle">
                <h2>CRM</h2>
            </div>
            <ul className="nav-menu-items">
                {SidebarData && SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={`${item.active ? item.className + ' active' : item.className}`}>
                            {item.subs.length > 0 ?
                                <>
                                    <a href="#" onClick={() => getBreadcrumb(0, item.path, item[trans.lang], false, item.active)}>
                                        {/* {icon(item.path, item.active)} */}
                                        <span>{item[trans.lang]}</span>
                                        {item.subs && item.subs.length > 0 && localStorage.sidebar === "true" ?
                                            <i className={`${item.subOpen ? 'sub-icon sub-icon-rotate' : 'sub-icon'}`}>
                                                <DownIcon color={item.active ?
                                                    (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") :
                                                    (theme === "dark" ? "#e5e5e5" : "#555")} />
                                            </i> : null}
                                    </a>

                                    <ul className={`${item.subOpen ? 'nav-dropdown open' : 'nav-dropdown close'}`}>
                                        {item.subs && item.subs.map((sub, i) => {
                                            return (
                                                <li key={i} className={`${sub.active ? sub.className + ' active' : sub.className}`}
                                                    onClick={() => setActiveSubMenu(i, item.path)}>
                                                    <Link key={'sub-item' + i} to={sub.path} onClick={() => getBreadcrumb(index, sub.path, sub[trans.lang], true, sub.active)}>
                                                        <div className='circle-icon'></div>
                                                        <span>{sub[trans.lang]}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                                :
                                <Link to={item.path} onClick={() => getBreadcrumb(index, item.path, item[trans.lang], false, item.active)}>
                                    {/* {icon(item.path, item.active)} */}
                                    <span>{item[trans.lang]}</span>
                                    {item.subs && item.subs.length > 0 && localStorage.sidebar === "true" ?
                                        <i className={`${item.subOpen ? 'sub-icon sub-icon-rotate' : 'sub-icon'}`}>
                                            <DownIcon color={item.active ?
                                                (theme === "dark" ? "rgba(96, 168, 221, 1)" : "rgba(96, 168, 221, 1)") :
                                                (theme === "dark" ? "#e5e5e5" : "#555")} />
                                        </i> : null}
                                </Link>
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
