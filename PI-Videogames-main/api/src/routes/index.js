const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const gamesApi = require('./gamesrouter.js/games')
const genresRouter = require('./genresrouter.js/genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', genresRouter)
router.use('/videogames', gamesApi)

module.exports = router;
