import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MainContainer, BoxContainer, HeaderContainer, CardBodyStyle, FooterContainer } from '../../css/Body/Containers.js'
import { FullBgImage } from '../../css/Body/Images.js';
import ImageCard from '../Common/image.jsx'
import { isValidURL, isNumberInRange } from '../../utils/'
import { fetchRecipeById, clearRecipesRequest } from '../../redux'
import { connect } from 'react-redux'
import { DataForm } from '../../css/Body/Forms.js'

const RecipeForm = ({ fetchRecipeById, foundRecipe, loading, error, clearRecipesRequest }) => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({
        id: 0,
        name: '',
        summary: '',
        image: '',
        steps: "",
        diets: [],
        healthScore: 0,
        spoonacularScore: 0,
    })

    let validationErrors = {
        name: recipe.name && recipe.name.length > 3 ? '' : 'Name is required. Must be at least 4 characters.',
        summary: recipe.summary && recipe.summary.length > 10 ? '' : 'Summary is required. Must be at least 10 characters.',
        image: recipe.image && isValidURL(recipe.image) ? '' : 'Image is required. Must be a valid URL.',
        steps: recipe.steps && recipe.steps.length > 10 ? '' : 'Steps are required. Must be at least 10 characters.',
        diets: recipe.diets && recipe.diets.length > 0 ? '' : 'Diets are required.',
        healthScore: recipe.healthScore && isNumberInRange(recipe.healthScore, [1, 100]) ? '' : 'Health score is required. Must be a number between 1 and 100.',
        spoonacularScore: recipe.spoonacularScore && isNumberInRange(recipe.spoonacularScore, [1, 100]) ? "" : 'Spoonacular Score is required. Must be a number between 1 and 100'
    }
    const validateForm = () => {
        let isValid = true;
        Object.values(validationErrors).forEach(val => {
            val.length > 0 && (isValid = false)
        })
        return isValid;
    }
    useEffect(() => {
        id && fetchRecipeById(id)
        return () => {
            console.log('clearing')
            clearRecipesRequest()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (foundRecipe) {
            setRecipe(foundRecipe)
        }
    }, [foundRecipe])

    const handleChange = (event) => {
        const { name, value } = event.target
        setRecipe({ ...recipe, [name]: value })
    }

    const dietList = recipe.diets ? recipe.diets.map((diet) => <li>{diet}</li>) : <li> No diets </li>

    const handleSubmit = (e) => {
        e.preventDefault()
        validateForm() && window.confirm(`update recipe ${recipe.name}?`) && console.log(recipe)
        console.log('submit')
    }

    return (
        <>
            <FullBgImage />
            <MainContainer align="center" height="100%" shadow="color-1" direction="row" justify="center">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {recipe.image && <ImageCard src={recipe.image} alt="heather_ford_1" height='90vh' width='65vw' />}

                <BoxContainer width="60vw" justify="flex-start" bg="color-1-70" margin="0" >
                    <DataForm onSubmit={handleSubmit} width="40vw" margin="0" inputBorder="color-3">
                        <HeaderContainer height="3vh" fontColor="color-7" fontSize="3rem" >
                            {id ? (<h1>Edit Recipe</h1>) : (<h1>Add Recipe</h1>)}
                        </HeaderContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70">
                                {<h2>Name:</h2>}
                            </HeaderContainer>
                            <input type="text" value={recipe.name} name="name" onChange={handleChange} />
                            <span>
                                {validationErrors.name}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Health Score:</h2>}
                            </HeaderContainer>
                            <input type="number" value={recipe.healthScore} name="healthScore" onChange={handleChange} />
                            <span>
                                {validationErrors.healthScore}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Spoonacular Score:</h2>}
                            </HeaderContainer>
                            <input type="number" value={recipe.spoonacularScore} name="spoonacularScore" onChange={handleChange} />
                            <span>
                                {validationErrors.spoonacularScore}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Image Url:</h2>}
                            </HeaderContainer>
                            <input type="text" value={recipe.image} name="image" onChange={handleChange} />
                            <span>
                                {validationErrors.image}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Summary:</h2>}
                            </HeaderContainer>
                            <textarea rows="5" cols="70" value={recipe.summary} name="summary" onChange={handleChange} />
                            <span>
                                {validationErrors.summary}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Diets</h2>}
                            </HeaderContainer>
                            <CardBodyStyle ulTop="0" ulColor="color-4">
                                <ul>
                                    {dietList}
                                </ul>
                            </CardBodyStyle>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Steps:</h2>}
                            </HeaderContainer>
                            <textarea rows="5" cols="70" value={recipe.steps} name="steps" placeholder="Steps for the recipe" onChange={handleChange} />
                            <span>
                                {validationErrors.steps}
                            </span>
                        </BoxContainer>
                        <FooterContainer fontColor="color-7" bg="color-3-70" >
                            <button type="submit">Save</button>
                        </FooterContainer>
                    </DataForm>

                </BoxContainer>
            </MainContainer>
        </>

    )
}

const mapStateToProps = state => ({
    recipeItems: state.recipe.numberOfRecipes,
    foundRecipe: state.recipe.foundRecipes,
    loading: state.recipe.loading,
    error: state.recipe.error
})

const mapDispatchToProps = dispatch => ({
    fetchRecipeById: (id) => dispatch(fetchRecipeById(id)),
    clearRecipesRequest: () => dispatch(clearRecipesRequest()),
})
export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)



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