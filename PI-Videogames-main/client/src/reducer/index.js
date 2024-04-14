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
                const sortedArr = [...state.videogames].sort((a, b) => {
                    const nameA = (a.name || '').toLowerCase();
                    const nameB = (b.name || '').toLowerCase();
                    if (payload === 'asc') {
                        return nameA.localeCompare(nameB);
                    } else {
                        return nameB.localeCompare(nameA);
                    }
                });
                return {
                    ...state,
                    videogames: sortedArr,
                    allVideogames: sortedArr,
                    allvideogames2: sortedArr,
                };
            

                case ORDER_BY_RAITING:
                    const sortedVideogames = [...state.allVideogames];
                    sortedVideogames.sort((a, b) => {
                        if (payload === 'max') {
                            return b.rating - a.rating;
                        } else {
                            return a.rating - b.rating; 
                        }
                    });
                    return {
                        ...state,
                        videogames: sortedVideogames, 
                    };
                

                case FILTER_BY_GENRES:
                    const allgames = state.allVideogames;
                    const filteredArr = allgames.filter(el => Array.isArray(el.genres) && el.genres.includes(payload));
                    return {
                        ...state,
                        allVideogames: state.allVideogames,
                        videogames: filteredArr
                    };
                




                    case GET_VIDEOGAMES_BY_ORIGIN:
                        let filterMyGames;
                        if (payload === 'Created') {
                            filterMyGames = state.allVideogames.filter(el => el.createdInDb === true);
                        } else if (payload === 'From Api') {
                            filterMyGames = state.allVideogames.filter(el => !el.createdInDb);
                        } else if (payload === 'All') {
                            filterMyGames = state.allVideogames;
                        }
                        return {
                            ...state,
                            videogames: filterMyGames,
                            allVideogames: filterMyGames.slice() 
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