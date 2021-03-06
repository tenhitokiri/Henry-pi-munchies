import React from 'react'
import { RecipeListStyle } from '../../css/Body/Containers.js'
import DietCard from './dietCard.jsx'

const DietsList = ({ dietList, handleDelete }) => {
    const voidDiet = {
        id: 0,
        name: 'No diets found',
    }

    const listMarkup = dietList.length > 0 ? (dietList.map(diet => <DietCard key={diet.id} diet={diet} handleDelete={handleDelete} />)) : (<DietCard key={voidDiet.id} diet={voidDiet} />)
    return (
        <RecipeListStyle width="100%" height="80vh" justify="center" align="center" bg="color-60">
            {listMarkup}
        </RecipeListStyle>
    )
}

export default DietsList