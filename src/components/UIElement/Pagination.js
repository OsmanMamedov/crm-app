import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LeftIcon, RightIcon } from '../icons';

export default function Pagination({ setSelectedPage, selectedPage }) {
    const { numbers } = useSelector(state => state.current)
    const theme = useSelector(state => state.theme)

    return (numbers.length > 0 &&
        <div className="pagination">
            <ul>
                <li onClick={() => {
                    setSelectedPage(selectedPage > 1 ? selectedPage - 1 : selectedPage)
                }}><LeftIcon color={theme === 'dark' ? '#e5e5e5' : '#3f3f3f'} /></li>
                {numbers.map(n => {
                    return (<li key={n}
                        className={n === selectedPage ? "active" : ""}
                        onClick={() => n === selectedPage ? null : setSelectedPage(n)}>{n}</li>)
                })}
                <li onClick={() => {
                    setSelectedPage(selectedPage < numbers.length ? selectedPage + 1 : selectedPage)
                }}><RightIcon color={theme === 'dark' ? '#e5e5e5' : '#3f3f3f'} /></li>
            </ul>
        </div>
    )
}
Pagination.propTypes = {
    numbers: PropTypes.array
};
