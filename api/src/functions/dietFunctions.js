const { Diet } = require("../db.js");
require('dotenv').config();
const { API_KEY } = process.env;
const { uniq } = require('./index.js');
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;

const validateDiet = ({ name }) => {
    let error = {};
    if (!name || name.length < 2) {
        error.name = "Please provide a name (at least 2 characters)";
    }
    return error;
}


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
    console.log(`populating diets`);
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
    try {
        let dietsDb = await Diet.bulkCreate(uniqDietList.map(diet => {
            return {
                name: diet
            }
        }
        ))
        console.log(`${dietsDb.length} diets created`);
    }
    catch (err) {
        console.log(err);
    }
}

const getDietById = async (req, res) => {
    const id = req.params.id;
    try {
        let diet = await Diet.findByPk(id);
        let foundDiet = {
            id: diet.id,
            name: diet.name,
        }
        return res.status(201).send(foundDiet);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

const getAllDiets = async (_, res) => {
    console.log(`looking for diets`);
    try {
        let diets = await Diet.findAll();
        console.log(`found ${diets.length} diets`);
        diets = diets.map(diet => {
            return {
                id: diet.id,
                name: diet.name
            }
        })
        return res.status(201).send(diets);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

const getDietByName = async (diets) => {
    let dietNames = [];
    let allDietNames = await getAllDiets();
    diets.forEach(diet => {
        allDietNames.forEach(dietName => {
            if (diet === dietName.id) {
                dietNames.push(dietName.name);
            }
        })
    })
    return dietNames;
}

const getDiets = async (req, res) => {
    let diets = await getAllDiets();
    res.status(201).send(diets);
}

const postDiet = async (req, res) => {
    const newRecipe = {
        name: req.body.name,
    };
    console.log(`name: ${newRecipe}`);
    let validationErrors = validateDiet(newRecipe);
    if (Object.keys(validationErrors).length > 0) return res.status(400).send(validationErrors)
    try {
        let createdDiet = await Diet.create(newRecipe);
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

const putDiet = async (req, res) => {
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
    getDietById,
    getDietByName,
    getAllDiets,
    getDiets,
    postDiet,
    putDiet,
    deleteDiet
}