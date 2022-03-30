import React from 'react'
import { RecipeCardStyle, CardHeaderStyle, CardBodyStyle, CardFooterStyle } from '../../css/Body/Containers.js'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const diets = recipe.diets ? recipe.diets.map((diet, index) => <li>{diet}</li>) : null
    return (
        <RecipeCardStyle>
            <CardHeaderStyle>
                <img src={recipe.image} alt={recipe.name} />
            </CardHeaderStyle>
            <CardBodyStyle >
                <Link to={`/recipes/${recipe.id}`}><h2 >{recipe.name}</h2></Link>

                <h3>Score: {recipe.healthScore} Pts</h3>
                <h3>Diets:
                </h3>
                <ul>
                    {diets}
                </ul>
            </CardBodyStyle>
            <CardFooterStyle >
                <Link to={`/recipes/edit/${recipe.id}`}>Edit</Link>
                {recipe.id < 900000 && <button>delete</button>}
            </CardFooterStyle>

        </RecipeCardStyle>
    )
}

export default RecipeCard