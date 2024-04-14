import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import Filter from "../Filters/Filters.jsx"
import styles from './Home.module.css';
import {
    getAllVideoGames,
    getGenres,
    getVideogameByName,
} from '../../actions/index.js';


import Paged from "../Paged/Paged.jsx";

const Home = () => {
    
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    
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


    const [search, setSearch] = useState({ 
        name: '',
    });

    
    const handleChange = (e) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
    };
    
    const handleSearch = (e) => { 
        e.preventDefault();
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
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
                <Filter setCurrentPage={setCurrentPage} />
                </nav>

                <div className={`${styles.header} ${styles.headerWithCreateButton}`}>

                <Link to="/">
                    <button className={styles.salirButton}>Sign ou</button>
                </Link>
                
                <Link to="/createGame">
                        <button className={styles.createButton}>Create Videogame</button>
                </Link>




                   <div className={styles.searchContainer}>
                  <input
                    className={styles.searchInput}
                    autoComplete="off"
                    type="text"
                    placeholder="Search Videogame..."
                    name="name"
                   value={search.name}
                   onChange={(e) => handleChange(e)}
                   />
              <button className={styles.searchButton} onClick={(e) => handleSearch(e)}> Search </button>
               </div>
            

          
            </div>

                <div style={{ marginTop: "80" }}>
                    <div className={styles.cardContainer}>

                        {current && current.length > 0 ? current.map(el => {
                            console.log(el);
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
