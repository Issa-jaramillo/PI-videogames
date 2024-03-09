const {Videogames, Genre} = require('../db');


const editGame = async (game, id) => {
    try {
      const { name, description, platforms, genres } = game;
      const editedGame = await Videogames.update({
        name: name,
        description: description,
        platforms: platforms,
      },
        {
          where: {
            id: id,
  
          },
        })
      if (!editedGame) {
        throw new Error('No se encuentra el juego solicitado')
      }
  
      const gameUpdated = await Videogames.findOne({
        where: {
          id: id,
        }
      })
  
      await genres.forEach(async (el) => {
        let genreFinded = await Genre.findOne({
          where: {
            name: el,
          },
        });
        const gameFinded = await Videogames.findOne({
          where: {
            id: id,
          },
          include: [Genre],
        })
        await gameFinded.setGenres([])
        await gameUpdated.addGenre(genreFinded);
      })
  
      return {
        message: 'Juego modificado con éxito!',
        result: gameUpdated
      }
    } catch (error) {
      throw new Error('No se pudo modificar el juego')
    }
  
  }
  

  module.exports = editGame;