import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MainContainer, BoxContainer, HeaderContainer, CardBodyStyle } from '../../css/Body/Containers.js'
import { FullBgImage } from '../../css/Body/Images.js';
import ImageCard from '../Common/image.jsx'

import { fetchRecipeById } from '../../redux'
import { connect } from 'react-redux'

const RecipeDetails = ({ fetchRecipeById, foundRecipes, loading, error }) => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    useEffect(() => {
        fetchRecipeById(id)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (foundRecipes) {
            setRecipe(foundRecipes)
        }
    }, [foundRecipes])

    const diets = recipe.diets ? recipe.diets.map((diet) => <li>{diet}</li>) : <li> No diets </li>

    const steps = recipe.steps ? recipe.steps.map((step) => {
        const stepKeys = Object.keys(step)
        console.log(stepKeys)
        const stepValues = Object.values(step)
        return (
            <div>
                <h3>{step["name"]}</h3>
            </div>
        )
    }
    ) : <li> No steps </li>


    return (
        <>
            <FullBgImage />
            <MainContainer align="center" height="100%" shadow="color-1" direction="row">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {recipe && <>
                    <ImageCard src={recipe.image} alt="heather_ford_1" height='90vh' width='65vw' />
                    <BoxContainer height="30%" justify="flex-start" bg="color-1-70" padding="1rem">
                        <HeaderContainer height="20%" fontColor="color-7" justify="center" >
                            {<h1>{recipe.name}</h1>}

                        </HeaderContainer>
                        <BoxContainer fontColor="color-7" bg="color-3-700" margin="1rem" direction="row" justify="space-around">
                            <div>
                                Health Sore: {recipe.healthScore}
                            </div>
                            <div>
                                Spoonacular Score: {recipe.spoonacularScore}
                            </div>
                        </BoxContainer>
                        <HeaderContainer fontColor="color-7" bg="color-3-70" margin="1rem">
                            {<h2>Summary:</h2>}
                        </HeaderContainer>
                        <BoxContainer fontColor="color-7" justify="flex-start" margin="1rem">
                            {<div dangerouslySetInnerHTML={{ __html: recipe.summary }} />}
                        </BoxContainer>
                        <BoxContainer fontColor="color-7" justify="flex-start" bg="color-1-70">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" margin="1rem">
                                {<h2>Diets</h2>}
                            </HeaderContainer>

                            <CardBodyStyle ulTop="0" ulColor="color-4">
                                <ul>
                                    {diets}
                                </ul>
                            </CardBodyStyle>
                        </BoxContainer>
                        <HeaderContainer fontColor="color-7" bg="color-3-70" margin="1rem">
                            {<h2>Steps:</h2>}
                        </HeaderContainer>
                        <BoxContainer fontColor="color-7" justify="flex-start" margin="1rem">
                            {<div dangerouslySetInnerHTML={{ __html: steps }} />}
                        </BoxContainer>
                    </BoxContainer>
                </>}
            </MainContainer>
        </>

    )
}

const mapStateToProps = state => ({
    recipeItems: state.recipe.numberOfRecipes,
    foundRecipes: state.recipe.foundRecipes,
    loading: state.recipe.loading,
    error: state.recipe.error
})

const mapDispatchToProps = dispatch => ({
    fetchRecipeById: (id) => dispatch(fetchRecipeById(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)



/* {
    "id": 3,
    "name": "test 3 con 2 recetas",
    "diets": [
      "gluten free",
      "dairy free"
    ],
    "summary": "Un resumen de lo que hay que hacer, si quieres",
    "healthScore": 35,
    "spoonacularScore": 45,
    "steps": "a bunch of useless steps",
    "image": "a mildly boring pic address",
    "imported": false
  } */