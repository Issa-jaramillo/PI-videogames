require('dotenv').config();
const { API_KEY } = process.env;
const {Videogames, Genre} = require('../db');
const axios = require('axios');

//obtener juegos por id
const getGameById = async (id) => {

  // Verifica si el ID es un número
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
  // Si el ID no es un número, busca en la api

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

  module.exports = getGameById;
