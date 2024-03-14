require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { getGamesOnDb } = require('./allgames');

const getGameByName = async (name) => {
    try {
        let apiGames = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        );

        const dbGames = await getGamesOnDb();
        let allGames = [...apiGames.data.results, ...dbGames];

        let gamesNames = allGames.filter((el) =>
            el.name.toLowerCase().includes(name.toLowerCase())
        );

        const data = gamesNames.map((el) => {
            return {
                id: el.id,
                name: el.name,
                description: el.description || 'Descripción no disponible',
                released: el.released,
                rating: el.rating || 0,
                img: el.createdInDb ? el.image : el.background_image,
                platforms: el.createdInDb ? el.platforms : el.platforms.map((p) => p.platform.name),
                genres: el.genres ? el.genres.map((g) => g.name) : [], // Verificación de existencia de genres
            };
        });

        return data;
    } catch (error) {
        // Puedes manejar el error aquí o simplemente dejar que se propague hacia arriba.
        throw error;
    }
};

module.exports = getGameByName;
