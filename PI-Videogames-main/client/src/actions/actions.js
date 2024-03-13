import axios from 'axios';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
}  from './types';

const URL = 'http://localhost:3001/videogames';

export const getAllvideoGames = () => {
    return async function (dispatch) {
      try {
        let response = await axios.get(`${URL}`);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data
      })} catch (error) {
        console.error('Error al obtener los videogames', error);
        dispatch({ type: GET_ALL_VIDEOGAMES, payload: error });
    }

    }}

export const getDetailVideogame = (id) => {
    return async function (dispatch) {
        try {
        let response = await axios.get(`${URL}/${id}`)
        return dispatch({
            type: GET_VIDEOGAME_BY_ID,
            payload: response.data
        })

        } catch (error) {
            console.error('Error al obtener los videogames por id', error);
            dispatch({ type: GET_VIDEOGAME_BY_ID, payload: error });
        }
    }
}


export const getVideogameByname = (name) => {
    return async function (dispatch) {
        try {
        let response = await axios.get(`${URL}/name?name=${name}`)
        return dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: response.data
        })
        } catch (error) {
            console.error('Error al obtener los videogames por nombre', error);
            dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: error });
        } 
        
    }
}


export const getGenres = (payload) => {
    return async function (dispatch) {
       try {
        let response = await axios.get(`http://localhost:3001/genres`, payload)
        return dispatch({
            type: GET_GENRES,
            payload: response.data
        });

       } catch (error) {
        console.error('Error al obtener los generos', error);
        dispatch({ type: GET_GENRES, payload: error });
       } 
    }
}

export const createVideoGame = (payload) => {
    return async function () {
        try {
            let {
                name,
                image,
                description,
                released,
                rating,
                platforms,
                genres
            } = payload;
            let response = await axios.post(`${URL}`, {
                name,
                image,
                description,
                releaseDate: new Date(released),
                rating,
                platforms,
                genres,
            })
            return response; 
        } catch (error) {
            console.error('Error al crear el videogame', error);
        }
    }
}


export const deleteVideogame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios.delete(`${URL}/${id}`)
            return dispatch({
                type: DELETED_GAME,
                payload: response.data
            })
        } catch (error) {
         
                console.error('No se pudo eliminar el videjuego', error);
                dispatch({ type: DELETED_GAME, payload: error });  
            
        }
    }
}


export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RAITING,
        payload

    }
}


export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}


export const getVideogamesByOrigin = (payload) => {
   return {
    type: GET_VIDEOGAMES_BY_ORIGIN,
    payload
   }
}



export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch({
            type: DELETE_STATES,
        })
    }
}


export const searchGameByPlatforms = () => { }
export const modifyVideoGame = (payload) => { }