const { Diet, conn } = require("../db.js");
require('dotenv').config();
const { API_KEY } = process.env;
const { uniq } = require('./index.js');
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;
let apiRecipes = [];

const uniqDiets = (recipe) => {
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

const populateDiets = async () => {
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
    let dietsDb = await Diet.bulkCreate(uniqDietList.map(diet => {
        return {
            name: diet
        }
    }
    ));
}

const findById = async (req, res) => {
    if (apiRecipes.length === 0) {
        apiRecipes = await getAllRecipes();
    }
    let id = parseInt(req.params.id);
    let recipe = {};
    if (id > 990000) {
        console.log("searching in api...");
        recipe = apiRecipes.find(recipe => recipe.id === id);
    }
    else {
        recipe = await recipe.findByPk(id, {
            include: [{ model: Breed, attributes: ['name'] }, { model: diet, attributes: ['name'], as: 'diets' }],
            attributes: ['id', 'name', 'life_span', 'weight', 'height', 'image_url'],
        });
        recipe = {
            id: recipe.id,
            name: recipe.name,
            diet: recipe.diets.map(item => item.name),
            breed: recipe.breed.name,
            life_span: recipe.life_span,
            weight: recipe.weight,
            height: recipe.height,
            image_url: recipe.image_url,
            imported: recipe.imported
        }
    }
    res.status(201).send(recipe);
}

const findByName = async (req, res) => {
    //todo: intentar con promise.all
    if (apiRecipes.length === 0) {
        apiRecipes = await getAllRecipes();
    }
    const name = req.query.name.toLowerCase();
    const apiRecipesByName = apiRecipes.filter(recipe => recipe.name.toLowerCase().includes(name));
    const recipe = await recipe.findAll({
        where: {
            name: conn.where(conn.fn('LOWER', conn.col('recipe.name')), 'LIKE', '%' + name + '%')
        },
        include: [{ model: Breed, attributes: ['name'], as: 'breed' }, { model: diet, attributes: ['name'], as: 'diets' }],
        attributes: ['id', 'name', 'life_span', 'weight', 'height', 'image_url'],

    });
    let recipes = recipe.map(recipe => {
        let dietList = [];
        if (recipe.diets) {
            dietList = recipe.diets.map(item => item.name);
        }
        let filteredrecipe = {
            id: recipe.id,
            name: recipe.name,
            diet: dietList,
            breed: recipe.breed.name,
            life_span: recipe.life_span,
            weight: recipe.weight,
            height: recipe.height,
            image_url: recipe.image_url,
            imported: recipe.imported
        };
        return filteredrecipe;
    });
    let result = [...apiRecipesByName, ...recipes];
    if (result.length === 0) {
        res.status(404).send("recipe not found");
    }
    else {
        res.status(201).send(result);
    }
}

const addRecipe = async (req, res) => {
    const {
        diet
    } = req.body;
    let newrecipe = {
        name: req.body.name,
        breedId: req.body.breedId,
        life_span: req.body.life_span,
        weight: req.body.weight,
        height: req.body.height,
        image_url: req.body.image_url,
        imported: false
    }
    try {
        let createdrecipe = await recipe.create(newrecipe);
        await createdrecipe.adddiets(diet)
        newrecipe = {
            ...newrecipe,
            diet
        }
        res.status(201).send(newrecipe)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const updateRecipe = async (req, res) => {
    const { name, id } = req.body;
    console.log(`name: ${name}`);
    console.log(`id: ${id}`);
    const recipe = await recipe.findByPk(id);
    if (recipe) {
        recipe.name = name;
        recipe.save();
        res.status(201).send(recipe);
    } else {
        res.status(404).send('recipe not found');
    }
}

const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    const recipe = await recipe.destroy({ where: { id } })
        .then(res.sendStatus(202))
        .catch(err => res.status(400).send(err));
}

module.exports = {
    uniqDiets,
    populateDiets,
    findByName,
    findById,
    addRecipe,
    updateRecipe,
    deleteRecipe
}