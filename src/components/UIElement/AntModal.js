import React from 'react'
import { Modal } from 'antd'

export default function AntModal({ width, title, visible, okText, cancelText, onOk, onCancel, children }) {
    return (
        <Modal
            width={width ? width : 350}
            centered={true}
            title={title}
            visible={visible}
            okText={okText ? okText : 'Ok'}
            cancelText={cancelText ? cancelText : 'Cancel'}
            onOk={onOk}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}