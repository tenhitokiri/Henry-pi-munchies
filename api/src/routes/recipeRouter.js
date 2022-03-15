const { Recipe, Diettype, conn } = require("../db.js");
const router = require('express').Router();
const { getAllRecipes, findRecipeByName } = require('../functions/index.js');
let apiRecipes = [];

//Functions
const findAllRecipes = async (_, res) => {
    if (apiRecipes.length === 0) {
        console.log("searching in api...");
        apiRecipes = await getAllRecipes();
        let apiRecipesCopy = apiRecipes.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                diets: recipe.diets,
                image_url: recipe.image,
                imported: recipe.imported
            }
        })
        console.log("searching in db...");
        let dbRecipes = await Recipe.findAll({
            include: [{ model: Diettype, as: 'Diets', attributes: ['name'] }],
            //attributes: ['id', 'name', 'Diets', 'image_url'],
        });
        let recipes = dbRecipes.map(recipe => {
            let dietList = [];
            if (recipe.diets) {
                dietList = recipe.diets.map(item => item.name);
            }
            let filteredrecipe = {
                id: recipe.id,
                name: recipe.name,
                diet: dietList,
                weight: recipe.weight,
                image_url: recipe.image_url,
            };
            return filteredrecipe;
        });
        let result = [...apiRecipesCopy, ...recipes];
        return res.status(201).send(result);
    }
    return res.status(201).send(apiRecipes);
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

//Routes
router.get('/name/', findByName);
router.get('/', findAllRecipes);
router.get('/:id', findById);
router.post('/', addRecipe);
router.put('/', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;