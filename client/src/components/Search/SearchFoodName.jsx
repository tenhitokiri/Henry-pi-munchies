import React, { useState } from 'react'
import { SearchForm } from '../../css/Common/Search.js'

const SearchFoodName = () => {
    const [text, setText] = useState('')
    const onChangeHandler = (e) => setText(e.target.value)
    return (
        <SearchForm>
            <input type="text"
                placeholder="Search by Food Name..."
                value={text}
                onChange={onChangeHandler}
            />
            <button type="submit" >{">"}</button>
        </SearchForm>

    )
}
export default SearchFoodName