import React from 'react'
import { RecipeListStyle } from '../../css/Body/Containers.js'
import RecipeCard from './recipeCard.jsx'


const RecipesPaging = ({ recipeList }) => {
    const listMarkup = recipeList.length > 0 ? (recipeList.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)) : (<p>No Recipes found</p>)
    return (
        <RecipeListStyle width="100%" height="100%" justify="center" align="center">
            {listMarkup}
        </RecipeListStyle>
    )
}
export default RecipesPaging