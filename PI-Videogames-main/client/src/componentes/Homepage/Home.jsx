import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from './Home.module.css';
import {
    getAllVideoGames,
    getGenres,
    filterByGenres,
    getVideogameByName,
    getVideoGamesByOrigin,
    orderAlphabetically,
    orderByRating,
    deleteStates,
} from '../../actions/index.js';

//Components
import Paged from "../Paged/Paged.jsx";

const Home = () => {
    // ------ PAGINADO -------
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    // Dentro del componente, verifica el estado al que estás suscrito
console.log("Estado actual en el componente:", allVideogames);

    const genres = useSelector((state) => state.genres);
    //Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);
    //division del array por cantidad de páginas requeridas
    const indexOfLastVideoGame = currentPage * videoGamesPP;
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP;
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        dispatch(getGenres());
        let vg = allVideogames && allVideogames;
        if (Array.isArray(vg) && vg.length === 0) {
            dispatch(getAllVideoGames());
        }
        setCurrent(
            Array.isArray(allVideogames) ? allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame) : []
        );
    }, [allVideogames, indexOfFirstVideoGame, indexOfLastVideoGame, dispatch]);
    
    
    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };

    //--------------------------
    const [isHiden, setIsHiden] = useState(false);
    const [search, setSearch] = useState({ //input de busqueda
        name: '',
    });

    const handleOrderAlphabetically = (e) => {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
    };
    
    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
    };
    
    const handleFilterGenres = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
    };
    
    const handleGetVideoGamesByOrigin = (e) => {
        e.preventDefault()
        dispatch(getVideoGamesByOrigin(e.target.value));
        setCurrentPage(1)
    };
    
    const handleChange = (e) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
    };
    
    const handleSearch = (e) => { //se ejecuta cuando clickeo boton 'go!'
        e.preventDefault();
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
    };
    
    const handleClearFilters = (e) => {
        dispatch(deleteStates()); // Eliminar los estados de los filtros
        setSearch({ name: '' }); // Limpiar el estado de búsqueda
    };
    

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };
 
    return (
        <>
            <div className={styles.Homepage}>
                <nav>

                    <select className={styles.select} onChange={(e) => { handleOrderAlphabetically(e) }}>
                        <option>Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select className={styles.select} onChange={(e) => handleOrderRating(e)}>
                        <option>Rating</option>
                        <option value="max">More Popular</option>
                        <option value="min">Less popular</option>
                    </select>

                    <select className={styles.select} onChange={(e) => handleFilterGenres(e)} defaultValue={'default'}>
                        <option value="default" disabled>Genres</option>
                        {genres?.map((el, i) => {
                            return (
                                <option key={i} value={el}>
                                    {el}
                                </option>
                            )
                        })
                        }
                    </select>

                    <select className={styles.select} onChange={(e) => { handleGetVideoGamesByOrigin(e) }}>
                        <option>Filter</option>
                        <option value="All">All Games</option>
                        <option value="Created">My Games</option>
                        <option value="From Api">Api Games</option>
                    </select>

                    <button onClick={e => handleClearFilters(e)}>Clear Filters/Refresh</button>

                    <Link to="/createGame">
                        <button >Create VideoGame</button>
                    </Link>
                </nav>
                <div>
                    <input 
                        autoComplete="off"
                        type="text"
                        placeholder="Search Videgame..."
                        name='name'
                        value={search.name}
                        onChange={(e) => handleChange(e)}
                    />
                    <button onClick={(e) => handleSearch(e)}>Search</button>
                </div>
                <div style={{ marginTop: "80" }}>
                    <div className={styles.cardContainer}>

                        {current && current.length > 0 ? current.map(el => {
                            return (
                                <Link key={el.id} to={`/videogames/${el.id}`}>
                                    <Card
                                        className={styles.card}
                                        name={el.name}
                                        img={el.createdInDb ? el.image : el.img}
                                        genres={el.createdInDb && el.genres ? 
                                            el.genres.map((genre) => genre.name).join(' ') :
                                            el.genres ? el.genres.join(' - ') : 'Unknown'
                                        }
                                    />
                                </Link>
                            )
                        }) :
                        <div >
                            <Loading />
                        </div>
                        }
                    </div>
                </div>
                <Paged
                    videoGamesPP={videoGamesPP}
                    allVideoGames={allVideogames.length}
                    paged={paged}
                    currentPage={currentPage}
                />
                <div className={styles.pageNumbers}>
                    <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
                    {Array.from({length: Math.ceil(allVideogames.length / videoGamesPP)}, (_, i) => (
                        <button key={i} onClick={() => paged(i + 1)} className={currentPage === i + 1 ? styles.active : ''}>
                            {i + 1}
                        </button>
                    ))}
                    <button disabled={currentPage === Math.ceil(allVideogames.length / videoGamesPP)} onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </>
    )

}

export default Home;
