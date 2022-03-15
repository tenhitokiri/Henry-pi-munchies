const { Diettype } = require('../db.js');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { API_KEY } = process.env;
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;

const uniq = (list) => {
    var seen = {};
    return list.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

const uniqDiets = (recipe) => {
    console.log(`filtering unique types for recipe: ${recipe.title}`);
    let uniqDietList = [];
    if (recipe.diets) {
        uniqDietList = recipe.diets.map(item => item.trim());
    }
    if (recipe.vegetarian) uniqDietList = [...uniqDietList, "vegetarian"];
    if (recipe.vegan) uniqDietList = [...uniqDietList, "vegetarian"];
    if (recipe.glutenFree) uniqDietList = [...uniqDietList, "gluten free"];

    uniqDietList = uniq(uniqDietList);
    return uniqDietList;
}

const populateDietTypes = async () => {
    let uniqDietList = [];
    let dietList = [];
    await axios
        .get(URL)
        .then(response => {
            recipes = response.data.results.map(recipe => {
                dietList = [...dietList, ...uniqDiets(recipe)];
            });
            uniqDietList = uniq(dietList);
        })
        .catch(error => {
            console.log(error);
        });
    let dietsDb = await Diettype.bulkCreate(uniqDietList.map(diet => {
        return {
            name: diet
        }
    }
    ));
}

const trimRecipes = foundRecipes => {
    console.log("fetching recipes...");
    console.log(`found ${foundRecipes.data.results.length} recipes`);
    foundRecipes = foundRecipes.data.results.map(recipe => {
        console.log(`recipe: ${recipe}`);
        console.log(recipe);
        let uniqDietList = uniqDiets(recipe);

        let id = parseInt(recipe.id) + 9000000
        let filteredRecipe = {
            id,
            name: recipe.name,
            diets: uniqDietList,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps: recipe.analyzedInstructions,
            image_url: recipe.image,
            imported: true
        }
        return filteredRecipe;
    });
    return foundRecipes;
}

const getAllRecipes = async () => {
    const res = await axios.get(URL)
        .then(trimRecipes)
        .catch(error => {
            console.log(error);
            return error;
        });
    return res
}

const findRecipeByName = async (name) => {
    const res = await axios.get(`${URL}&query=${name}`)
        .then(trimRecipes)
        .catch(error => {
            console.log(error);
            return error;
        });
}

module.exports = {
    getAllRecipes,
    findRecipeByName,
    populateDietTypes
}