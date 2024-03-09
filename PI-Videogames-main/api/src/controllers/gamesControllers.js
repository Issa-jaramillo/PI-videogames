const axios = require('axios');
const {Videogames, Genre} = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getGamesOnDb = async () => {
    const gamesOnDb = await Videogames.findAll({
        include: {
            model: Genre, attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    })
    if(gamesOnDb.lenght === 0){
        throw new Error('No se encontraron juegos en la Db')
    }
    return gamesOnDb
}


const getgamesOnApi = async () => {
      //Pego a la api y traigo 20 juegos
  //(pag 1 en iterador 0 ---> 20 juegos)
  let response = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`,//3 ---> 4
  )

  //Hago el endpoint anterior 5 veces para traerme un total de 100 juegos
  let result = [];//1, 2 ---> next 3
  for (let i = 0; i < 5; i++) {
    result = [...result, ...response.data.results];
    response = await axios.get(response.data.next);//esto se repite 5 veces. // string url
  }

  const data = result.map((el) => {
    return {
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      img: el.background_image,
      platforms: el.platforms.map((p) => p.platform.name),
      genres: el.genres.map((g) => g.name),
    }
  })
  return data;
}






const getAllGames = async () => {
    const apiData = await getgamesOnApi()
    const dbData = await getGamesOnDb()
    return [...apiData, ...dbData]
  }



  const getGameByName = async (name) => {
    try {
      let apiGames = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`,
      );
  
      const dbGames = await getGamesOnDb();
      let allGames = [
        ...apiGames.data.results,
        ...dbGames
      ];
  
      let gamesNames = allGames.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase()),
      );
  
      const data = gamesNames.map((el) => {
        return {
          id: el.id,
          name: el.name,
          description: el.description || 'Descripción no disponible',
          released: el.released,
          rating: el.rating || 0,
          img: el.createdInDb ? el.image : el.background_image,
          platforms: el.createdInDb ?
            el.platforms :
            el.platforms.map((p) => p.platform.name),
          genres: el.genres.map((g) => g.name),
        };
      });
  
      return data;
    } catch (error) {
      // Puedes manejar el error aquí o simplemente dejar que se propague hacia arriba.
      throw error;
    }
  };
  


  const getGameById = async (id) => {
    if (isNaN(id)) {
      let idByDB = await Videogames.findOne({
        where: {
          id: id,
        },
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        }
      });
      if (!idByDB) {
        throw new Error('No se encontró el juego con el id solicitado')
      }
      return idByDB;
    }
    else {
  
      const findById = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
      )
      if (!findById) {
        throw new Error('No se encontró el juego con el id solicitado')
      }
      return {
        id: findById.data.id,
        name: findById.data.name,
        description: findById.data.description,
        released: findById.data.released,
        rating: findById.data.rating,
        img: findById.data.background_image,
        platforms: findById.data.platforms.map((p) => p.platform.name),
        genres: findById.data.genres.map((g) => g.name),
      }
    }
  }


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



  


  module.exports = {
    getgamesOnApi,
    getGamesOnDb,
    getAllGames,
    getGameByName,
    getGameById,
    createGame,
    editGame,
    deleteGame,
  }