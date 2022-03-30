const { Recipe, Diet, conn } = require("../db.js");
require('dotenv').config();
const { API_KEY } = process.env;
const { uniqDiets, findDietNames } = require('./dietFunctions.js');
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;
let apiRecipes = [];

const validateRecipe = ({ diets,
    name,
    summary,
    healthScore,
    spoonacularScore,
    steps,
    image }) => {

    let error = {};
    if (!name || name.length < 2) {
        error.name = "Please provide a name (at least 2 characters)";
    }
    if (!summary || summary.length < 2) {
        error.summary = "Please provide a summary (at least 2 characters)";
    }
    if (!healthScore || healthScore < 1 || healthScore > 100) {
        error.healthScore = "Please provide a valid health score (1-100)";
    }
    if (!spoonacularScore || spoonacularScore < 1 || spoonacularScore > 100) {
        error.spoonacularScore = "Please provide a valid spoonacular score (1-100)";
    }
    if (!steps || steps.length < 2) {
        error.steps = "Please provide a steps (at least 2 characters)";
    }
    if (!image || image.length < 2) {
        error.image = "Please provide an image (at least 2 characters)";
    }
    /* 
        if (!diets || diets.length < 1) {
            console.log(diets);
            error.diets = "Please provide at least one diet";
        }
     */
    return error;

}

const trimApiRecipes = foundRecipes => {
    console.log(`found ${foundRecipes.data.results.length} recipes`);
    foundRecipes = foundRecipes.data.results.map(recipe => {
        let uniqDietList = uniqDiets(recipe);
        let id = parseInt(recipe.id) + 9000000
        let steps = recipe.analyzedInstructions.map(instruction => instruction.steps.map(step => step.step));
        steps = steps.map(step => step.join("\n"));

        let filteredRecipe = {
            id,
            name: recipe.title || recipe.name,
            diets: uniqDietList,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps,
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
            healthScore: recipe.healthScore,
            imported: recipe.imported
        }
    })
    return res.status(201).send(allRecipes);
}

const getRecipeById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (id > 0) {
        let allRecipes = await populateAllRecipes();
        let recipe = allRecipes.find(recipe => recipe.id === id);
        return res.status(201).send(recipe);
    }
    return res.status(400).send("Invalid recipe id");
}

const getRecipeByName = async (req, res) => {
    const name = req.body.name;
    if (name.length > 2) {
        console.log(`searching for ${req.body.name}`);
        let foundRecipes = await findRecipeByName(req.body.name);
        let allRecipes = await populateAllRecipes();
        allRecipes = allRecipes.filter(recipe => recipe.name.includes(req.body.name));
        allRecipes = [...allRecipes, ...foundRecipes];
        return res.status(201).send(allRecipes);
    }
    return res.status(400).send("Please provide a name (at least 2 characters)");
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
    let validationErrors = validateRecipe(newRecipe);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) return res.status(400).send(validationErrors)
    try {
        //let createdrecipe = { id: 999 };
        let createdrecipe = await Recipe.create(newRecipe);
        await createdrecipe.addDiet(diets)
        let dietNames = await findDietNames(diets)
        newRecipe = {
            ...newRecipe,
            id: createdrecipe.id,
            diets: dietNames
        }
        console.log(newRecipe);
        return res.status(201).send(newRecipe)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err)
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

    let UpdatedRecipe = {
        name,
        summary,
        healthScore,
        spoonacularScore,
        steps,
        image,
        imported: false
    }

    let validationErrors = validateRecipe(UpdatedRecipe);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) return res.status(400).send(validationErrors)

    let results;

    if (req.body.id < 9000000) {
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

            results = {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                spoonacularScore: recipe.spoonacularScore,
                steps: recipe.steps,
                image: recipe.image,
                diets: findDietNames(diets)
            }
            return results;
            //res.status(201).send(results);
        })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    }
    else {
        let recipe = await apiRecipes.find(recipe => recipe.id === req.body.id);
        recipe.name = name;
        recipe.summary = summary;
        recipe.healthScore = healthScore;
        recipe.spoonacularScore = spoonacularScore;
        recipe.steps = steps;
        recipe.image = image;
        //        recipe.setDiets(diets);
        results = {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            spoonacularScore: recipe.spoonacularScore,
            steps: recipe.steps,
            image: recipe.image,
            diets
        }
        return results;
    }
    res.status(201).send(results);
}


const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    if (id < 9000000) {
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
    else {
        apiRecipes = apiRecipes.filter(recipe => recipe.id !== id);
        res.status(201).send(`recipe with id ${id} deleted`);
    }
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