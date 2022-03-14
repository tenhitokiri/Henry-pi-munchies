const { Temperament, conn } = require("../db.js");
const router = require('express').Router();

//Functions
const findAllTemperament = async (_, res) => {
    const temperament = await Temperament.findAll();
    res.json(temperament.length ? temperament : 'No temperament found');
}

const findTemperamentById = async (req, res) => {
    const temperament = await Temperament.findByPk(req.params.id);
    res.status(201).send(temperament);
}

const findTemperamentByName = async (req, res) => {
    const name = req.params.name.toLowerCase();
    const temperament = await Temperament.findAll({
        where: {
            name: conn.where(conn.fn('LOWER', conn.col('name')), 'LIKE', '%' + name + '%')
        }
    });
    res.status(201).send(temperament);
}

const addTemperament = async (req, res) => {
    const temperament = await Temperament.create(req.body)
        .then(temperament => res.status(201).send(temperament))
        .catch(err => res.status(400).send(err));
}

const updateTemperament = async (req, res) => {
    const { name, id } = req.body;
    console.log(`name: ${name}`);
    console.log(`id: ${id}`);
    const temperament = await Temperament.findByPk(id);
    console.log(temperament);
    if (temperament) {
        temperament.name = name;
        temperament.save();
        res.status(201).send(temperament);
    } else {
        res.status(404).send('temperament not found');
    }
}

const deleteTemperament = async (req, res) => {
    const id = req.params.id;
    const temperament = await Temperament.destroy({ where: { id } })
        .then(res.sendStatus(202))
        .catch(err => res.status(400).send(err));
}

//Routes
router.get('/', findAllTemperament);
router.get('/:id', findTemperamentById);
router.get('/name/:name', findTemperamentByName);
router.post('/', addTemperament);
router.put('/', updateTemperament);
router.delete('/:id', deleteTemperament);

module.exports = router;