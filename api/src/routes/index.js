const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRouter = require('./typeRouter.js');
const recipeRouter = require('./recipeRouter.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get('/api/breed', addBreed);
router.use("/types", typeRouter)
router.use("/recipes", recipeRouter)

module.exports = router;
