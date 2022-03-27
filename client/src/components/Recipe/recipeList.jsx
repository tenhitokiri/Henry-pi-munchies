import React from 'react'
import { RecipeListStyle } from '../../css/Body/Containers.js'
import RecipeCard from './recipeCard.jsx'


const RecipesList = ({ recipeList }) => {
    const listMarkup = recipeList.length > 0 ? (recipeList.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)) : (<p>No Recipes found</p>)
    return (
        <RecipeListStyle width="100%" height="84vh" justify="center" align="center" bg="color-60">
            {listMarkup}
        </RecipeListStyle>
    )
}
export default RecipesList