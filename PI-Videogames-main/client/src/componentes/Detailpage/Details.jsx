import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import styles from './detail.module.css';
import { useParams , useNavigate } from 'react-router-dom';
import { getDetailVideoGame, deleteVideoGame } from '../../actions/index';

const Details = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const dispatch = useDispatch();
    const detailVideoGame = useSelector((state) => state.details);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetailVideoGame(id)); // Utilizar el ID de la URL
    }, [dispatch, id]); // Agregar id como dependencia del efecto

    const handleDeleteGame = (e) => {
        e.preventDefault();
        let resultado = window.confirm('¿Estás seguro que deseas eliminar este juego?');
        if (resultado === true) {
            window.alert('Juego borrado con éxito');
            dispatch(deleteVideoGame(id)); 
            navigate('/home');
            // window.location.replace(''); // Recargar la página
        }
    };

    return (
        <div className={styles.detailContainer}>
            {detailVideoGame && detailVideoGame.createdInDb === true ? (
                <div className={styles.detailCard}>
                    <h1>{detailVideoGame?.name}</h1>
                    <img src={detailVideoGame?.image} alt='imagen' />
                    <h4>Released at: {detailVideoGame && detailVideoGame.releaseDate ? detailVideoGame.releaseDate.slice(0, 10) : "Unknown"}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <h4>Description: <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p></h4>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>Genres: {detailVideoGame.genres?.map(el => el.name).join(' - ')}</h3>
                    <Link to="/home"><button className={styles.volverButton}>Volver a Home</button></Link>
                    <button className={styles.volverButton} onClick={(e) => handleDeleteGame(e)}>Delete game</button>
                </div>
            ) : (
                <div className={styles.detailCard}>
                    <h1>{detailVideoGame?.name}</h1>
                    <img src={detailVideoGame?.img} alt='imagen' />
                    <h4>Released at: {detailVideoGame?.released}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>Genres: {detailVideoGame.genres?.map(el => el).join(' - ')}</h3>
                    <Link to="/home"><button className={styles.volverButton}>Volver a Home</button></Link>
                </div>
            )}
        </div>
    );
};

export default Details;
