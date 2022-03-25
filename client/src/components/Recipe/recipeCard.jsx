import React from 'react'
import { RecipeCardStyle, CardHeaderStyle, CardBodyStyle } from '../../css/Body/Containers.js'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const diets = recipe.diets ? recipe.diets.map((diet, index) => <li>{diet}</li>) : null
    return (
        <RecipeCardStyle>
            <CardHeaderStyle>
                <img src={recipe.image} alt={recipe.name} />
            </CardHeaderStyle>
            <CardBodyStyle >
                <h2 >
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </h2>
                <h3>Score: {recipe.healthScore} Pts</h3>
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