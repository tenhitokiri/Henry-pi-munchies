const { Diet } = require("../db.js");
require('dotenv').config();
const { API_KEY } = process.env;
const { uniq } = require('./index.js');
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;

const uniqDiets = (Diet) => {
    let uniqDietList = [];
    if (Diet.diets) {
        uniqDietList = Diet.diets.map(item => item.trim());
    }
    if (Diet.vegetarian) uniqDietList = [...uniqDietList, "vegetarian"];
    if (Diet.vegan) uniqDietList = [...uniqDietList, "vegetarian"];
    if (Diet.glutenFree) uniqDietList = [...uniqDietList, "gluten free"];

    uniqDietList = uniq(uniqDietList);
    return uniqDietList;
}

const populateDiets = async () => {
    let uniqDietList = [];
    let dietList = [];
    await axios
        .get(URL)
        .then(response => {
            recipes = response.data.results.map(Diet => {
                dietList = [...dietList, ...uniqDiets(Diet)];
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

const findDietById = async (req, res) => {
    let diet = await Diet.findByPk(id);
    diet = {
        id: Diet.id,
        name: Diet.name,
    }
    res.status(201).send(Diet);
}

const findAllDiets = async () => {
    let diets = await Diet.findAll();
    diets = diets.map(diet => {
        return {
            id: diet.id,
            name: diet.name
        }
    })
    return diets;
}

const findDietNames = async (diets) => {
    let dietNames = [];
    let allDietNames = await findAllDiets();
    diets.forEach(diet => {
        allDietNames.forEach(dietName => {
            if (diet.id === dietName.id) {
                dietNames.push(dietName.name);
            }
        })
    })
    return dietNames;
}

const getDiets = async (req, res) => {
    let diets = await findAllDiets();
    res.status(201).send(diets);
}

const addDiet = async (req, res) => {
    const {
        name
    } = req.body;
    try {
        let createdDiet = await Diet.create(name);
        newDiet = {
            id: createdDiet.id,
            name: createdDiet.name
        }
        return res.status(201).send(newDiet)
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

const updateDiet = async (req, res) => {
    const { name, id } = req.body;
    console.log(`name: ${name}`);
    console.log(`id: ${id}`);
    const diet = await Diet.findByPk(id).then(diet => {
        diet.name = name;
        diet.save();
        return diet;
    })
        .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
    res.status(201).send(diet);
}

const deleteDiet = async (req, res) => {
    const id = req.params.id;
    const diet = await Diet.destroy({ where: { id } })
        .then(res.status(201).send(`Diet with id ${id} deleted`))
        .catch(err => res.status(400).send(err));
}

module.exports = {
    uniqDiets,
    populateDiets,
    findDietById,
    findDietNames,
    findAllDiets,
    getDiets,
    addDiet,
    updateDiet,
    deleteDiet
}