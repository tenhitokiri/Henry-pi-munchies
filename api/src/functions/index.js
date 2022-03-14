const { Diettype } = require('../db.js');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { API_KEY } = process.env;
const axios = require('axios');
const recipeSlice = process.env.RECIPE_SLICE || 100;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${recipeSlice}`;
let diets = [];

const uniq = (list) => {
    var seen = {};
    return list.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

let populateDietTypes = async () => {
    await axios
        .get(URL)
        .then(response => {
            console.log("fetching recipes...");
            console.log(`found ${response.data.results.length} recipes`);

            recipes = response.data.results.map(recipe => {
                if (recipe.diets) {
                    let dietList = recipe.diets.map(item => item.trim());
                    diets = [...diets, ...dietList];
                }
            });

            diets = uniq(diets);
            console.log("unique diets");
            console.log(diets);
        })
        .catch(error => {
            console.log(error);
        });
    let dietsDb = await Diettype.bulkCreate(diets.map(diet => {
        return {
            name: diet
        }
    }
    ));

}

let getAllRecipes = async () => {
    console.log("fetching recipes...");
    const res = await axios.get(URL)
        .then(foundrecipes => {
            foundrecipes = foundrecipes.data.slice(0, recipeSlice - 1).map(recipe => {
                let dietList = [];
                if (recipe.diets) {
                    dietList = recipe.diets.split(',');
                    dietList = dietList.map(item => item.trim());
                }
                let id = parseInt(recipe.id) + 9000000

                let filteredrecipe = {
                    id,
                    name: recipe.title,
                    diets: dietList,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    spoonacularScore: recipe.spoonacularScore,
                    steps: recipe.steps,
                    image_url: recipe.image,
                    imported: true
                }
                return filteredrecipe;
            });
            console.log("recipes fetched");
            console.log(foundrecipes);
            return foundrecipes;
        }
        )
        .catch(error => {
            console.log(error);
            return error;
        });
}


const findRecipeByName = async (name) => {
    const res = await axios.get(`${URL}&q=${name}`)
    let foundrecipes = res.data
    foundrecipes = foundrecipes.map(recipe => {
        let dietList = [];
        if (recipe.diets) {
            dietList = recipe.diets.split(',');
            dietList = dietList.map(item => item.trim());
        }
        let weight = recipe.weight.metric;
        let height = recipe.height.metric;
        let id = parseInt(recipe.id) + 990000
        let filteredrecipe = {
            id,
            name: recipe.name,
            diets: dietList,
            diet: recipe.diet_group,
            life_span: recipe.life_span,
            weight,
            height,
            image_url: recipe.image.url,
            imported: true
        }
        return filteredrecipe;
    });
    return foundrecipes;
}

module.exports = {
    getAllRecipes,
    findRecipeByName,
    populateDietTypes
}


/* eslint-disable
  {
"bred_for": "Small rodent hunting, laprecipe",
"diet_group": "Toy",
"height": {
"imperial": "9 - 11.5",
"metric": "23 - 29"
},
"id": 1,
"image": {
"height": 1199,
"id": "BJa4kxc4X",
"url": "https://cdn2.therecipeapi.com/images/BJa4kxc4X.jpg",
"width": 1600
},
"life_span": "10 - 12 years",
"name": "Affenpinscher",
"origin": "Germany, France",
"reference_image_id": "BJa4kxc4X",
"diets": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
"weight": {
"imperial": "6 - 13",
"metric": "3 - 6"
}
},
*/