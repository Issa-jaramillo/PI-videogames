const {Videogames, Genre} = require('../db');

// crear videojuego
const createGame = async (game) => {
    try {
      const { genres } = game;

    //nuevo juego  
      const newGame = await Videogames.create(game)
    //asocio los generos  
      genres.map(async (el) => {


        let genreGameDB = await Genre.findOne({
          where: {
            name: el,
          },
        });
     //agrega   
        await newGame.addGenre(genreGameDB);
      })
      if (!newGame) {
        throw new Error('Error interno, no se pudo crear el juego')
      }


    //busca el juego  
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

