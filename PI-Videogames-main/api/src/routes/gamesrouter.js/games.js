const { Router } = require('express')
const router = Router()
const { getAllGames } = require('../../controllers/allgames.js')
const getGameByName = require('../../controllers/getname.js')
const getGameById = require('../../controllers/getgameId.js')
const createGame = require('../../controllers/createGame.js')
const deleteGame = require('../../controllers/deleteGame.js')


router.get('/', async (req, res) => {
    try {
      const games = await getAllGames();
      res.status(200).json(games);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });



  router.get('/name', async (req, res) => {
    const { name } = req.query;
  
    try {
      if (!name) {
        return res.status(400).json({ error: 'El parámetro "name" es requerido.' });
      }
  
      // Obtener los juegos por nombre
      const games = await getGameByName(name);
  
      if (games.length === 0) {
        return res.status(404).json({ error: 'No se encontraron videojuegos con el nombre proporcionado.' });
      }
  
      // Devolver los primeros 15 juegos
      res.status(200).json(games.slice(0, 15));
      
    } catch (error) {
      
      console.error('Error al buscar videojuegos por nombre:', error);
      res.status(500).json({ error: 'Error al buscar videojuegos por nombre.' });
    }
  });
  




   router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const getById = await getGameById(id)
      res.status(200).json(getById)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })


  
router.post('/', async (req, res) => {
    const newGame = req.body
    const created = await createGame(newGame)
    try {
      res.status(200).json(created)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })


  
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGame = await deleteGame(id)
      res.status(200).json({ message: `El juego "${deletedGame.name}", HA SIDO ELIMINADO` })
    } catch (error) {
      res.status(404).json({ error: 'No se pudo eliminar el juego' })
    }
  })
  
  module.exports = router