const { Videogames } = require('../db');

//eiminar juego
const deleteGame = async (id) => {

//busco el videojuego por id
    const findGame = await Videogames.findOne({
      where: {
        id: id
      },
    })
    if (!findGame) {
      throw new Error('No se pudo encontrar el juego')

      
    } else {
      await findGame.destroy()
    }
    return findGame;
  }

module.exports = deleteGame;