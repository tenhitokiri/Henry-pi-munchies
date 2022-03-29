const router = require('express').Router();
const { getRecipeByName,
    getAllRecipes,
    getRecipeById,
    postRecipe,
    updateRecipe,
    deleteRecipe } = require('../functions/recipeFunctions.js');

//Routes
router.get('/name/', getRecipeByName);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', postRecipe);
router.put('/', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;