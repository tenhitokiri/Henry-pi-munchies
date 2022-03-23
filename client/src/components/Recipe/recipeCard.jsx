import React from 'react'
import { RecipeCardStyle, CardHeaderStyle, CardBodyStyle } from '../../css/Body/Containers.js'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const diets = recipe.temperament ? recipe.temperament.map((temperament, index) => <li>{temperament}</li>) : null
    return (
        <RecipeCardStyle>
            <CardHeaderStyle>
                <img src={recipe.image_url} alt={recipe.name} />
            </CardHeaderStyle>
            <CardBodyStyle >
                <h2 >
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </h2>
                <h3>Weight: {recipe.weight} Pounds</h3>
                <h3>diets:
                </h3>
                <ul>
                    {diets}
                </ul>
            </CardBodyStyle>
        </RecipeCardStyle>
    )
}

export default RecipeCard