const { Videogames } = require('../db');


const deleteGame = async (id) => {

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