import React, { useState, useEffect } from 'react'
import ImageUpload from '../UIElement/ImageUpload'

export default function Avatar(props) {
    const { img, defaultImg } = props
    const [err, setErr] = useState(null)
    const [profileImage, setProfileImage] = useState(undefined)
    const loadedAvatar = url => {
        setProfileImage(url);
        props.changeUrl(url);
        setErr(null)
    }

    const errMsg = (msg) => {
        setErr(msg)
    }

    useEffect(() => {
        setProfileImage(img);
    }, [img])

    return (
        <>
            <div className='image-upload-container'>
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <ImageUpload
                            changeCurrentAvatar={loadedAvatar}
                            errMsg={errMsg}
                            fileType="img"
                        />
                    </div>
                    <div className="avatar-preview">
                        {(profileImage === null || profileImage === undefined || profileImage.length < 5) ? <img src={defaultImg} alt="" className="imagePreview" /> :
                            <img src={profileImage} alt="" className="imagePreview" />
                        }
                    </div>
                </div>
            </div>
            {err && <span className="avatar_max_size">{err}</span>}</>
    )
}
