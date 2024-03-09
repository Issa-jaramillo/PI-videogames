const {Videogames, Genre} = require('../db');


const createGame = async (game) => {
    try {
      const { genres } = game;
      const newGame = await Videogames.create(game)
      genres.map(async (el) => {
        let genreGameDB = await Genre.findOne({
          where: {
            name: el,
          },
        });
        await newGame.addGenre(genreGameDB);
      })
      if (!newGame) {
        throw new Error('Error interno, no se pudo crear el juego')
      }
      const gameCreated = await Videogames.findOne({
        where: {
          id: newGame.id,
        },
        include: {
          model: Genre,
          attributes: [],
          through: {
            attributes: [],
          },
        },
      })
      return gameCreated;
    } catch (error) {
      return error
    }
  }


  module.exports = createGame;

