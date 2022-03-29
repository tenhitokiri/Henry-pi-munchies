const router = require('express').Router();
const { getDietByName,
    getAllDiets,
    getDietById,
    postDiet,
    putDiet,
    deleteDiet } = require('../functions/dietFunctions.js');

//Routes
router.get('/', getAllDiets);
router.get('/:id', getDietById);
router.get('/name/:name', getDietByName);
router.post('/', postDiet);
router.put('/', putDiet);
router.delete('/:id', deleteDiet);

module.exports = router;