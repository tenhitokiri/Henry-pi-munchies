import React from 'react'
import DogCard from './DogCard.jsx'
import { recipeListStyle } from '../../css/Body/Dog.js'

const DogsPaging = ({ recipeList, pageSize, total, orderBy }) => {
    const listMarkup = recipeList.length > 0 ? (recipeList.map(dog => <DogCard key={dog.id} dog={dog} />)) : (<p>No dogs found</p>)
    return (
        <recipeListStyle>
            {listMarkup}
        </recipeListStyle>
    )
}
export default DogsPaging