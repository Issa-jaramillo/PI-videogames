import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllVideoGames,
    filterByGenres,
    getVideoGamesByOrigin,
    orderAlphabetically,
    orderByRating,
    deleteStates,
} from '../../actions/index.js';
import styles from './Filter.module.css';

const Filter = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');



    const handleOrderAlphabetically = (e) => {
        e.preventDefault();
        setSelectedOrder(e.target.value); // Actualizar el estado del filtro
        dispatch(orderAlphabetically(e.target.value));
        setCurrentPage(1);
    };


    const handleOrderRating = (e) => {
        e.preventDefault();
        setSelectedRating(e.target.value);
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterGenres = (e) => {
        e.preventDefault();
        setSelectedGenre(e.target.value);
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
    };

    const handleGetVideoGamesByOrigin = (e) => {
        e.preventDefault();
        setSelectedOrigin(e.target.value)
        dispatch(getVideoGamesByOrigin(e.target.value));
        setCurrentPage(1);
    };

    const handleClearFilters = (e) => {
        e.preventDefault();
        dispatch(deleteStates()); // Eliminar los estados de los filtros
        setSelectedOrder('');
        setSelectedRating('');
        setSelectedOrigin('');
        setSelectedGenre('');
        setCurrentPage(1);
        dispatch(getAllVideoGames()); // Recargar todos los videojuegos
    };

    return (
        <div>
            <nav className={styles.select}>
                <select  value={selectedOrder} onChange={(e) => handleOrderAlphabetically(e)}>
                    <option>Ordenar</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <select  value={selectedRating} onChange={(e) => handleOrderRating(e)}>
                    <option>Rating</option>
                    <option value="max">Más Popular</option>
                    <option value="min">Menos popular</option>
                </select>

                <select  value={selectedGenre} onChange={(e) => handleFilterGenres(e)} defaultValue={'default'}>
                    <option >Géneros</option>
                    {genres?.map((el, i) => (
                        <option key={i} value={el}>
                            {el}
                        </option>
                    ))}
                </select>

                <select  value={selectedOrigin} onChange={(e) => handleGetVideoGamesByOrigin(e)}>
                    <option>Filtrar</option>
                    <option value="Created">Mis juegos</option>
                    <option value="From Api">Juegos de la API</option>
                </select>

             
                <button className={styles.clearButton} onClick={handleClearFilters}>Allvideogames</button>
            </nav>
        </div>
    );
};

export default Filter;
