import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './detail.module.css';
import { getDetailVideogame, deleteVideogame } from '../../actions/actions';

const Details = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const detailVideoGame = useSelector((state) => state.details);
    useEffect(() => {
        dispatch(getDetailVideogame(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const handleDeleteGame = (e) => {
        e.preventDefault()
        let resultado = window.confirm('Estas seguro que desea eliminar este juego?');
        if(resultado === true){
            window.alert('Juego borrado con exito');
            dispatch(deleteVideogame(props.match.params.id));
            history.push()
        }
    }


    return (
        <div>
              {detailVideoGame.createdInDb === true
                ?
                <div>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.image}
                        alt='imagen'
                    />
                    <h4>Released at: {(detailVideoGame?.releaseDate).slice(0, 10)}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <h4>Description:
                        <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    </h4>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>
                        Genres: {detailVideoGame.genres?.map(el => el.name).join(' - ')}
                    </h3>
                    {/* <Link to={`/editVideoGame/${detailVideoGame.id}`}>
                        <button>Modify...</button>
                        </Link> */}



                    <button onClick={(e) => handleDeleteGame(e)}>Delete game</button>
                </div>
                :
                <div>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.img}
                        alt='imagen'
                    />
                    <h4>Released at: {detailVideoGame?.released}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>Genres: {detailVideoGame.genres?.map(el => el).join(' - ')}</h3>
                </div>
            }
        </div>
    )
}
export default Details;