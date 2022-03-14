const { Recipe, Diettype, conn } = require("../db.js");
const router = require('express').Router();
const { getAlldogs, findDogByName } = require('../functions/index.js');
let apiDogs = [];

//Functions
const findAllDog = async (_, res) => {
    if (apiDogs.length === 0) {
        apiDogs = await getAlldogs();
    }
    let apiDogsCopy = apiDogs.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            weight: dog.weight,
            image_url: dog.image_url,
        }
    })
    let dbDogs = await Dog.findAll({
        include: [{ model: Breed, attributes: ['name'] }, { model: Temperament, attributes: ['name'], as: 'temperaments' }],
        attributes: ['id', 'name', 'life_span', 'weight', 'height', 'image_url'],
    });
    let dogs = dbDogs.map(dog => {
        let temperamentList = [];
        if (dog.temperaments) {
            temperamentList = dog.temperaments.map(item => item.name);
        }
        let filteredDog = {
            id: dog.id,
            name: dog.name,
            temperament: temperamentList,
            weight: dog.weight,
            image_url: dog.image_url,
        };
        return filteredDog;
    });
    let result = [...apiDogsCopy, ...dogs];
    res.status(201).send(result);
}

const findDogById = async (req, res) => {
    if (apiDogs.length === 0) {
        apiDogs = await getAlldogs();
    }
    let id = parseInt(req.params.id);
    let dog = {};
    if (id > 990000) {
        console.log("searching in api...");
        dog = apiDogs.find(dog => dog.id === id);
    }
    else {
        dog = await Dog.findByPk(id, {
            include: [{ model: Breed, attributes: ['name'] }, { model: Temperament, attributes: ['name'], as: 'temperaments' }],
            attributes: ['id', 'name', 'life_span', 'weight', 'height', 'image_url'],
        });
        dog = {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperaments.map(item => item.name),
            breed: dog.breed.name,
            life_span: dog.life_span,
            weight: dog.weight,
            height: dog.height,
            image_url: dog.image_url,
            imported: dog.imported
        }
    }
    res.status(201).send(dog);
}

const findDogName = async (req, res) => {
    //todo: intentar con promise.all
    if (apiDogs.length === 0) {
        apiDogs = await getAlldogs();
    }
    const name = req.query.name.toLowerCase();
    const apiDogsByName = apiDogs.filter(dog => dog.name.toLowerCase().includes(name));
    const dog = await Dog.findAll({
        where: {
            name: conn.where(conn.fn('LOWER', conn.col('dog.name')), 'LIKE', '%' + name + '%')
        },
        include: [{ model: Breed, attributes: ['name'], as: 'breed' }, { model: Temperament, attributes: ['name'], as: 'temperaments' }],
        attributes: ['id', 'name', 'life_span', 'weight', 'height', 'image_url'],

    });
    let dogs = dog.map(dog => {
        let temperamentList = [];
        if (dog.temperaments) {
            temperamentList = dog.temperaments.map(item => item.name);
        }
        let filteredDog = {
            id: dog.id,
            name: dog.name,
            temperament: temperamentList,
            breed: dog.breed.name,
            life_span: dog.life_span,
            weight: dog.weight,
            height: dog.height,
            image_url: dog.image_url,
            imported: dog.imported
        };
        return filteredDog;
    });
    let result = [...apiDogsByName, ...dogs];
    if (result.length === 0) {
        res.status(404).send("Dog not found");
    }
    else {
        res.status(201).send(result);
    }
}

const addDog = async (req, res) => {
    const {
        temperament
    } = req.body;
    let newDog = {
        name: req.body.name,
        breedId: req.body.breedId,
        life_span: req.body.life_span,
        weight: req.body.weight,
        height: req.body.height,
        image_url: req.body.image_url,
        imported: false
    }
    try {
        let createdDog = await Dog.create(newDog);
        await createdDog.addTemperaments(temperament)
        newDog = {
            ...newDog,
            temperament
        }
        res.status(201).send(newDog)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const updateDog = async (req, res) => {
    const { name, id } = req.body;
    console.log(`name: ${name}`);
    console.log(`id: ${id}`);
    const dog = await Dog.findByPk(id);
    if (dog) {
        dog.name = name;
        dog.save();
        res.status(201).send(dog);
    } else {
        res.status(404).send('dog not found');
    }
}

const deleteDog = async (req, res) => {
    const id = req.params.id;
    const dog = await Dog.destroy({ where: { id } })
        .then(res.sendStatus(202))
        .catch(err => res.status(400).send(err));
}

//Routes
router.get('/name/', findDogName);
router.get('/', findAllDog);
router.get('/:id', findDogById);
router.post('/', addDog);
router.put('/', updateDog);
router.delete('/:id', deleteDog);

module.exports = router;