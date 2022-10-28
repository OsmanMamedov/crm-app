import React from 'react'

export const SidebarData = [
    {
        en: 'Home',
        tr: 'Ana Sayfa',
        ru: 'Главная Странтца',
        path: '/home',
        className: 'nav-text',
        active: true,
        subs: []
    },
    {
        en: 'Customer Management',
        tr: 'Müşteri Yönetimi',
        ru: 'Управление Клиентами',
        path: '/customer-management',
        className: 'nav-text',
        active: false,
        subs: []
    },
    {
        en: 'Calendar',
        tr: 'Takvim',
        ru: 'Календарь',
        path: '/calendar',
        className: 'nav-text',
        active: false,
        subs: []
    },
    {
        en: 'User Management',
        tr: 'Kullanıcı Yönetimi',
        ru: 'Управление Пользователями',
        path: '/user-management',
        className: 'nav-text',
        active: false,
        subs: []
    },
    {
        en: 'Company Management',
        tr: 'Firma Yönetimi',
        ru: 'Управление Kомпании',
        path: '/company-setting',
        className: 'nav-text',
        active: false,
        subs: []
    },
    {
        en: 'Definitions',
        tr: 'Tanımlamalar',
        ru: 'Определения',
        path: '/definitions',
        className: 'nav-text',
        active: false,
        subOpen: false,
        subs: [
            {
                en: 'Customer Types',
                tr: 'Müşteri Tipleri',
                ru: 'Тип Клиентов',
                path: '/definitions/customer-type',
                className: 'nav-sub-text',
                active: false,
            },
            {
                en: 'Authorization',
                tr: 'Yetkilendirme',
                ru: 'Авторизация',
                path: '/definitions/authorization',
                className: 'nav-sub-text',
                active: false,
            }
        ]
    },
    {
        en: 'Settings',
        tr: 'Ayarlar',
        ru: 'Настройки',
        path: '/settings',
        className: 'nav-text',
        active: false,
        subs: []
    },
]