const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const gamesApi = require('./gamesrouter.js/games')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', gamesApi )
//router.get('/videogames/:idVideogame', getgameDetail)

module.exports = router;
