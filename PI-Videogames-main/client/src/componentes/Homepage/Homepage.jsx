import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import styles from "./Home.module.css";
import Paged from "../Paged/Paged";
import {
    getAllvideoGames,
    getGenres,
    filterByGenres,
    getVideogameByname,
    getVideogamesByOrigin,
    orderAlphabetically,
    orderByRating,
    deleteStates,
} from '../../actions/actions'

const Homepage = () => {
        // ------ PAGINADO -------
    const dispatch = useDispatch();
    const allvideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
         //Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);

        //division del array por cantidad de páginas requeridas
    
    const indexOfLastVideoGame = currentPage * videoGamesPP;
    const indexOfFirtsVideoGame = indexOfLastVideoGame - videoGamesPP;
    const [current, setCurrent ] = useState([]);

    useEffect(() => {
        dispatch(getGenres())
        let vg = allvideogames && allvideogames;
        if (vg.length === 0){
            dispatch(getAllvideoGames())
        }
        setCurrent(
            allvideogames.slice(indexOfFirtsVideoGame, indexOfLastVideoGame)
        )
    }, [allvideogames, indexOfFirtsVideoGame, indexOfLastVideoGame, dispatch]
    );
    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };
    const [ isHiden, setIsHiden ] = useState(false);
    const [search, setSearch ] = useState({
        name: '',
    });

    
    const handleOrderAlphabetically = (e) => {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allvideogames.slice(indexOfFirtsVideoGame, indexOfLastVideoGame)
        )
    };

    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allvideogames.slice(indexOfFirtsVideoGame, indexOfLastVideoGame)
        )
    };

    const handleFilterGenres = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allvideogames.slice(indexOfFirtsVideoGame, indexOfLastVideoGame)
        )
    };

    const handleGetVideoGamesByOrigin = (e) => {
        e.preventDefault()
        dispatch(getVideogamesByOrigin(e.target.value));
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    };

    const handleChange = (e) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
        dispatch(getVideogameByname(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    };


    const handleSearch = (e) => { //se ejecuta cuando clickeo boton 'go!'
        e.preventDefault();
        dispatch(getVideogameByname(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    };

    const handleClearFilters = (e) => {
        dispatch(deleteStates())
    }

  
    return (
        <>
        <div>
            <nav>
                
            <select  onChange={(e) => { handleOrderAlphabetically(e) }}>
                        <option>Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select  onChange={(e) => handleOrderRating(e)}>
                        <option>Rating</option>
                        <option value="max">More Popular</option>
                        <option value="min">Less popular</option>
                    </select>

                    <select  onChange={(e) => handleFilterGenres(e)} defaultValue={'default'}>
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

                    <select  onChange={(e) => { handleGetVideoGamesByOrigin(e) }}>
                        <option>Filter</option>
                        <option value="All">All Games</option>
                        <option value="Created">My Games</option>
                        <option value="From Api">Api Games</option>
                    </select>

                    <button onClick={e => handleClearFilters(e)}>Clear Filters/Refresh</button>

                    <Link to="/createGame">
                        <button>Create VideoGame</button>
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
                    <button  onClick={(e) => handleSearch(e)}>Search</button>
                </div>
                <div style={{ marginTop: "80" }}>
                    <div>

                        {current.length > 0 ? current.map(el => {
                            return (
                                <Link key={el.id} to={`/videogames/${el.id}`}>
                                    <Card
                                        name={el.name}
                                        img={el.createdInDb ? el.image : el.img}
                                        genres={el.createdInDb ?
                                            el.genres.map((el) => el.name).join(' ') :
                                            el.genres.join(' - ')
                                        }
                                    />
                                </Link>
                            )
                        }) :
                            <div>
                                <Loading />
                            </div>
                        }
                    </div>
                </div>
                <Paged
                    videoGamesPP={videoGamesPP}
                    allVideoGames={allvideogames.length}
                    paged={paged}
                />
        </div>
        
        </>
    )

}

export default Homepage;



