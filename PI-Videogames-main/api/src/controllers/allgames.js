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

  module.exports = {
    getgamesOnApi,
    getGamesOnDb,
    getAllGames,
  }