const { Recipe, Diet, conn } = require("../db.js");
require('dotenv').config();
const { API_KEY } = process.env;
const { uniqDiets } = require('./dietFunctions.js');
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;
let apiRecipes = [];

const trimApiRecipes = foundRecipes => {
    console.log(`found ${foundRecipes.data.results.length} recipes`);
    foundRecipes = foundRecipes.data.results.map(recipe => {
        let uniqDietList = uniqDiets(recipe);
        let id = parseInt(recipe.id) + 9000000

        let filteredRecipe = {
            id,
            name: recipe.title || recipe.name,
            diets: uniqDietList,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps: recipe.analyzedInstructions,
            image: recipe.image,
            imported: true
        }
        return filteredRecipe;
    });
    return foundRecipes;
}

const getApiRecipes = async () => {
    console.log("searching recipes in api...");
    const res = await axios.get(URL)
        .then(trimApiRecipes)
        .catch(error => {
            console.log(error);
            return error;
        });
    return res
}

const getDBRecipes = async () => {
    console.log("searching recipes in db...");
    let dbRecipes = await Recipe.findAll({
        include: [{ model: Diet, as: 'Diets', attributes: ['name'] }],
        attributes: ['id', 'name', 'summary', 'healthScore', 'spoonacularScore', 'steps', 'image']
    });
    console.log(`found ${dbRecipes.length} recipes in database`);
    let results = dbRecipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            diets: recipe.Diets.map(diet => diet.name),
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps: recipe.steps,
            image: recipe.image,
            imported: false
        }
    })
    return results;
}

const populateAllRecipes = async () => {
    if (apiRecipes.length === 0) {
        console.log("Empty list found, generating ...");
        apiRecipes = await getApiRecipes();
    }
    let dbRecipes = await getDBRecipes();

    let allRecipes = [...dbRecipes, ...apiRecipes];
    console.log(`found ${allRecipes.length} recipes total`);
    return allRecipes;
}

const findRecipeByName = async (name) => {
    const res = await axios.get(`${URL}&query=${name}`)
        .then(trimApiRecipes)
        .catch(error => {
            console.log(error);
            return error;
        });
    return res;
}

const getAllRecipes = async (_, res) => {
    let allRecipes = await populateAllRecipes();
    allRecipes = allRecipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            diets: recipe.diets,
            image: recipe.image,
            imported: recipe.imported
        }
    })
    return res.status(201).send(allRecipes);
}

const getRecipeById = async (req, res) => {
    let allRecipes = await populateAllRecipes();
    let id = parseInt(req.params.id);
    let recipe = allRecipes.find(recipe => recipe.id === id);
    res.status(201).send(recipe);
}

const getRecipeByName = async (req, res) => {
    console.log(`searching for ${req.body.name}`);
    let foundRecipes = await findRecipeByName(req.body.name);
    let allRecipes = await populateAllRecipes();
    allRecipes = allRecipes.filter(recipe => recipe.name.includes(req.body.name));
    allRecipes = [...allRecipes, ...foundRecipes];
    res.status(201).send(allRecipes);
}

const postRecipe = async (req, res) => {
    const {
        diets,
        name,
        summary,
        healthScore,
        spoonacularScore,
        steps,
        image
    } = req.body;

    let newRecipe = {
        name,
        summary,
        healthScore,
        spoonacularScore,
        steps,
        image,
        imported: false
    }
    try {
        let createdrecipe = await Recipe.create(newRecipe);
        await createdrecipe.addDiet(diets)
        newRecipe = {
            ...newRecipe,
            id: createdrecipe.id,
            diets
        }
        res.status(201).send(newRecipe)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}

const updateRecipe = async (req, res) => {
    const {
        diets,
        name,
        summary,
        healthScore,
        spoonacularScore,
        steps,
        image
    } = req.body;

    let recipe = await Recipe.findOne({
        where: { id: req.body.id },
        include: [{
            model: Diet,
            as: 'Diets'
        }]
    }).then(recipe => {
        recipe.name = name;
        recipe.summary = summary;
        recipe.healthScore = healthScore;
        recipe.spoonacularScore = spoonacularScore;
        recipe.steps = steps;
        recipe.image = image;
        recipe.setDiets(diets);
        recipe.save();

        let results = {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps: recipe.steps,
            image: recipe.image,
            diets
        }

        res.status(201).send(results);
    })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
}


const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.destroy({ where: { id } })
        .then(result => {
            console.log(result);
            return res.status(201).send(`recipe with id ${id} deleted`)
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        });
}

module.exports = {
    getApiRecipes,
    findRecipeByName,
    getRecipeByName,
    getAllRecipes,
    getRecipeById,
    postRecipe,
    updateRecipe,
    deleteRecipe
}