import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MainContainer, BoxContainer, HeaderContainer, RecipeListStyle, FooterContainer } from '../../css/Body/Containers.js'
import { FullBgImage } from '../../css/Body/Images.js';
import ImageCard from '../Common/image.jsx'
import { isValidURL, isNumberInRange } from '../../utils/'
import { fetchRecipeById, clearSearchedRecipes, updateRecipe, addRecipe, fetchRecipes } from '../../redux'
import { connect } from 'react-redux'
import { DataForm } from '../../css/Body/Forms.js'
import DietMiniCard from '../Diet/dietMiniCard.jsx'

const RecipeForm = ({ fetchRecipeById, foundRecipe, loading, error, clearSearchedRecipes, dietList, updateRecipe, fetchRecipes }) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const mode = id ? "edit" : "add"
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
        diets: recipe.diets && recipe.diets.length > 0 ? '' : 'At least 1 Diet is required.',
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

    const handleFormDataChange = (event) => {
        const { name, value } = event.target
        setRecipe({ ...recipe, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (validateForm() && window.confirm(`${mode} recipe ${recipe.name}?`)) {
            const updatedRecipe = {
                ...recipe,
                diets: tmpDietList.filter(diet => diet.checked).map(diet => diet.id)
            }
            //TODO: call reducer to update recipe
            if (mode === "edit") {
                updateRecipe(updatedRecipe)
            } else {
                addRecipe(updatedRecipe)
                console.log("Added Recipe")
            }
            console.log(updatedRecipe)
            fetchRecipes()
            navigate('/recipes')

        }
    }

    useEffect(() => {
        if (id) {
            fetchRecipeById(id)
        }
        return () => {
            console.log('clearing')
            clearSearchedRecipes()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (foundRecipe) {
            setRecipe(foundRecipe)
        }
    }, [foundRecipe])

    let tmpDietList = dietList.map(diet => {
        const newDiet = {
            id: diet.id,
            name: diet.name,
            checked: recipe.diets ? recipe.diets.includes(diet.name) : false
        }
        return newDiet
    }
    )

    const handleSelect = (id) => {
        tmpDietList = tmpDietList.map(diet => {
            if (diet.id === id) {
                diet.checked = !diet.checked
            }
            return diet
        })
        setRecipe({ ...recipe, diets: tmpDietList.filter(diet => diet.checked).map(diet => diet.name) })
    }

    //let recipeDietList = tmpDietList ? tmpDietList.map((diet) => <DietMiniCard diet={diet} handleSelect={handleSelect} />) : <div> No diets </div>
    let recipeDietList = tmpDietList.map((diet) => <DietMiniCard diet={diet} handleSelect={handleSelect} />)
    return (
        <>
            <FullBgImage />
            <MainContainer align="center" height="100%" shadow="color-1" direction="row" justify="center">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {recipe.image && <ImageCard src={recipe.image} alt="heather_ford_1" height='90vh' width='45vw' />}

                <BoxContainer width="80vw" justify="flex-start" bg="color-1-70" margin="0" zIndex="10">
                    <DataForm onSubmit={handleFormSubmit} width="60vw" margin="0" inputBorder="color-3">
                        <HeaderContainer height="3vh" fontColor="color-7" fontSize="3rem" >
                            {id ? (<h1>Edit Recipe</h1>) : (<h1>Add Recipe</h1>)}
                        </HeaderContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70">
                                {<h2>Name:</h2>}
                            </HeaderContainer>
                            <input type="text" value={recipe.name} name="name" onChange={handleFormDataChange} />
                            <span>
                                {validationErrors.name}
                            </span>
                        </BoxContainer>
                        <BoxContainer fontColor="color-7" justify="flex-start" direction="row">
                            <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh" justify="flex-start">
                                <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                    {<h2>Health Score:</h2>}
                                </HeaderContainer>
                                <input type="number" value={recipe.healthScore} name="healthScore" onChange={handleFormDataChange} />
                                <span>
                                    {validationErrors.healthScore}
                                </span>
                            </BoxContainer>

                            <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh" justify="flex-start">
                                <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                    {<h2>Spoonacular Score:</h2>}
                                </HeaderContainer>
                                <input type="number" value={recipe.spoonacularScore} name="spoonacularScore" onChange={handleFormDataChange} />
                                <span>
                                    {validationErrors.spoonacularScore}
                                </span>
                            </BoxContainer>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Image Url:</h2>}
                            </HeaderContainer>
                            <input type="text" value={recipe.image} name="image" onChange={handleFormDataChange} />
                            <span>
                                {validationErrors.image}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Summary:</h2>}
                            </HeaderContainer>
                            <textarea rows="5" cols="70" value={recipe.summary} name="summary" onChange={handleFormDataChange} />
                            <span>
                                {validationErrors.summary}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="8vh" justify="flex-start">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Diets</h2>}
                            </HeaderContainer>
                            <RecipeListStyle fontColor="color-7" bg="color-3-70" height="15vh" justify="flex-start">
                                {recipeDietList}
                            </RecipeListStyle>
                            <span>
                                {validationErrors.diets}
                            </span>
                        </BoxContainer>

                        <BoxContainer fontColor="color-7" bg="color-3-70" height="4vh">
                            <HeaderContainer fontColor="color-7" bg="color-3-70" >
                                {<h2>Steps:</h2>}
                            </HeaderContainer>
                            <textarea rows="5" cols="70" value={recipe.steps} name="steps" placeholder="Steps for the recipe" onChange={handleFormDataChange} />
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
    error: state.recipe.error,
    dietList: state.diet.dietItems,

})

const mapDispatchToProps = dispatch => ({
    fetchRecipeById: (id) => dispatch(fetchRecipeById(id)),
    clearSearchedRecipes: () => dispatch(clearSearchedRecipes()),
    updateRecipe: (recipe) => dispatch(updateRecipe(recipe)),
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    fetchRecipes: () => dispatch(fetchRecipes()),
})
export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)