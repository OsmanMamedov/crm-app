import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RefreshIcon, PlusIcon } from '../icons'

export default function ImageUpload({ onChange, changeCurrentAvatar, fileType, errMessage }) {
    const trans = useSelector(state => state.trans)
    const theme = useSelector(state => state.theme)
    const [selectedFile, setSelectedFile] = useState(null)
    const handleImageChoosen = e => {
        e.preventDefault()
        let file = e.target.files[0]
        setSelectedFile(file)
        if (file && file.size < 1000000 && fileType === "img") {

            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                changeCurrentAvatar(reader.result)
            }
        }
        else if (file && file.size < 1000000 && fileType === "file") {
            const data = new FormData()
            data.append("postedFile", file);
            changeCurrentAvatar(data);
        }
        else if (file && 1000000 < file.size < 3000000) {
            errMessage('kayıt büyük 1')
        }
        else if (file && file.size > 1000000) {
            errMessage('kayıt büyük 2')
        }
    }

    return (
        <React.Fragment>
            <input
                type='file'
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={e => handleImageChoosen(e)}
            />
            <label htmlFor="imageUpload">
                <PlusIcon color={"#5d5d5d"} />
            </label>
        </React.Fragment>
    )
}
