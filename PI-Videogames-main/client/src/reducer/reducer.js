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
    CREATE_GAME,
} from '../actions/types';

const initialstate = {
    videogames: [],
    allVideogames: [],
    allvideogames2: [],
    genres: [],
    details: [],
}


function rootReducer( state = initialstate, action){
    const {type, payload } = action;
    switch(type) {
        case GET_ALL_VIDEOGAMES:
        if (state.videogames.length > 0){
           return{
            videogames: state.videogames,
            allVideogames: state.allVideogames
           }
        }
        return {
            ...state,
            allVideogames: payload,
            videogames: payload,
            details: [],
        };


        case GET_VIDEOGAME_BY_ID: 
         return {
            ...state,
            details: payload,
        };

        case CREATE_GAME:
            return {
                ...state,
            };

        case GET_GENRES:
            return {
                ...state,
                details: [],
                genres: payload,
            };
        

        case ORDER_ALPHABETICALLY:
            const sortedArr = payload === 'asc' ? 
            state.videogames.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if(nameA > nameB){
                    return 1
                }
                if (nameB > nameA) {
                    return -1
                } else {
                    return 0
                }
            }) :
            state.videogames.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if(nameA > nameB) {
                    return -1
                }
                if(nameB > nameA) {
                    return 1
                } else {
                    return 0
                }
            });
            return {
                ...state,
                videogames: sortedArr,
                allVideogames: sortedArr,
                allvideogames2: sortedArr,
            };
    

            case ORDER_BY_RAITING:
                const ratingFiltered = payload === 'max' ?
                state.videogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating){
                        return -1
                    } else {
                        return 0
                    }
                }) : 
                state.videogames.sort((a, b) => {
                    if(a.rating < b.rating){
                        return -1
                    }
                    if(b.rating < a.rating){
                        return 1
                    } else {
                        return 0
                    }
                });
                return {
                    ...state,
                    allVideogames: ratingFiltered,
                    videogames: ratingFiltered,
                    allvideogames2: ratingFiltered,
                };

                case FILTER_BY_GENRES:
                const allgames = state.allVideogames;
                const filteredArr = allgames.filter(el => el.genres.includes(payload))
                return{
                    ...state,
                    allVideogames: state.allVideogames,
                    videogames: filteredArr
                };




                case GET_VIDEOGAMES_BY_ORIGIN:
                    let filterMyGames;
                    if(payload === 'Created') {
                        filterMyGames = allVideogames.filter(el => el.createInDb === true)
                        return {
                            ...state,
                            videogames: filterMyGames
                        }
                    } else if (payload === 'Fro Api'){
                        filterMyGames = state.allVideogames.filter(el => !el.createInDb)
                        return {
                            ...state,
                            videogames: filterMyGames
                        }
                    } else if (payload === 'All'){
                        filterMyGames === state.allVideogames
                        return {
                            ...state,
                            videogames: filterMyGames
                        }
                    };


                    case GET_VIDEOGAMES_BY_NAME:
                        return {
                            ...state,
                            videogames: payload
                        };


                        case DELETED_GAME:

                        return {
                            ...state,
                            videogames: payload
                        };
               

                        case DELETE_STATES:
                            return {
                                videogames: [],
                                getAllVideoGames: [],
                                genres: [],
                                details: [],
                            };
                        default:
                            return state;
                    

    }       
    }

    export default rootReducer;

