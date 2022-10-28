import React from 'react'
import AntButton from '../UIElement/AntButton'
import { TrashIcon, EditIcon } from '../icons'

function ProductCard({ images, title, description, onChange, editItem, deleteItem }) {
    return (
        <div class="post">
            <div class="header_post">
                <img src={images} />
            </div>
            <div class="body_post">
                <div class="post_content">
                    <h1 className='title'>{title}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                    <div class="container_infos">
                        <div className='infos_item'>
                            {editItem}
                        </div>
                        <div className='infos_item'>
                            {deleteItem}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
