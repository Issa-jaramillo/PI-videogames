import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, createVideoGame } from '../../actions/index'
import { Link } from "react-router-dom";
import styles from './create.module.css';


const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms =
    [
      "PC",
      "PlayStation 5",
      "Xbox One",
      "PlayStation 4",
      "Xbox Series S/X",
      "Nintendo Switch",
      "iOS",
      "Android",
      "Nintendo 3DS",
      "Nintendo DS",
      "Nintendo DSi",
      "macOS",
      "Linux",
      "Xbox 360",
      "Xbox",
      "PlayStation 3",
      "PlayStation 2",
      "PlayStation",
      "PS Vita",
      "PSP",
      "Wii U",
      "Wii",
      "GameCube",
      "Nintendo 64",
      "Game Boy Advance",
      "Game Boy Color",
      "Game Boy",
      "SNES",
      "NES",
      "Classic Macintosh",
      "Apple II",
      "Commodore / Amiga",
      "Atari 7800",
      "Atari 5200",
      "Atari 2600",
      "Atari Flashback",
      "Atari 8-bit",
      "Atari ST",
      "Atari Lynx",
      "Atari XEGS",
      "Genesis",
      "SEGA Saturn",
      "SEGA CD",
      "SEGA 32X",
      "SEGA Master System",
      "Dreamcast",
      "3DO",
      "Jaguar",
      "Game Gear",
      "Neo Geo"
    ];

  useEffect(() => {
    dispatch(getGenres()); //recibe la accion
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: [],
  })

 //------------VALIDACIONES/ERRORS ------------------
const validators = (values) => {
  let errors = {};

// Validación del nombre del juego
if (!values.name || (/^[a-zA-Z ]{1,3}$/).test(values.name)) {
  errors.name = '*Please enter the name of the game, must be at least 3 characters long';
} else if (values.name.length > 15) {
  errors.name = '*The name cannot exceed 15 characters';
} else if (/\d/.test(values.name)) {
  errors.name = '*Numbers are not allowed in the name';
}


  // Validación de la URL de la imagen
  if (!values.image || !isValidUrl(values.image)) {
    errors.image = '*Please enter a valid URL for the image';
  }

  // Validación de la descripción del juego
  if (!values.description || hasSpecialCharacters(values.description)) {
    errors.description = '*Please enter a valid videogame description (Max 100 characters)';
  }

  // Validación del rating
  if (!values.rating || values.rating === '0' || values.rating < 0.5 || values.rating > 5) {
    errors.rating = "Please insert a number between 0.5 and 5";
  }

  // Validación de la fecha de lanzamiento
  if (!values.released) {
    errors.released = "Please insert a date";
  }

  // Validación de las plataformas seleccionadas
  if (values.platforms.length === 0) {
    errors.platforms = '*Please select at least one platform';
  }

  // Validación de los géneros seleccionados
  if (!values.genres || values.genres.length === 0) {
    errors.genres = '*Please select at least one genre';
  }

  return errors;
}

// Función para validar una URL
const isValidUrl = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
}

// Función para verificar si la descripción contiene caracteres especiales
const hasSpecialCharacters = (text) => {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return specialChars.test(text);
}


  const handleChange = (e) => { //cuando hay un cambio se dispara esta funcion con un e
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    setErrors(
      validators({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  }

  //-------------------------------------------------------SUBMIT----------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar si la imagen es nula o vacía y asignar una imagen por defecto si es necesario
    if (values.image === null || values.image === '') {
      values.image = 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg'
    }
  
    // Validar que todos los campos requeridos estén completos
    if (!values.name &&
      !values.description &&
      !values.rating &&
      !values.released &&
      !values.platforms.length &&
      !values.genres.length
    ) {
      alert("Missing Data to send Form");
      return; // Salir de la función si faltan datos
    }


   // Validar si hay errores antes de crear el videojuego
  const formErrors = validators(values);
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors, alert("There are errors in the form, it cannot be submitted."));
    return ; // Evitar enviar el formulario si hay errores
  } 
  
    // Si todos los campos requeridos están completos, proceder con la creación del videojuego
    dispatch(createVideoGame(values));
    alert('Videogame Created');
    setValues({
      name: '',
      image: '',
      description: '',
      released: '',
      rating: 0,
      platforms: [],
      genres: [],
    });
  }
  
  const handleChangePlatform = (e) => {
    if (values.platforms.includes(e.target.value)) {
      alert('This platform has already been selected.Please choose another')
    } else {
      setValues(
        (state) => ({
          ...state,
          platforms: [...state.platforms, e.target.value],
        })
      )
    }

  }

  const handleDeletePlatform = (e, p) => {
    e.preventDefault();
    setValues({
      ...values,
      platforms: values.platforms.filter((el) => el !== p)
    })
  }

  const handleChangeGenre = (e) => {
    if (values.genres.includes(e.target.value)) {
      alert('This genre has already been selected.Please choose another')
    } else {
      setValues(
        (state) => ({
          ...state,
          genres: [...state.genres, e.target.value],
        })
      )
    }
  }

  const handleDeleteGenre = (e, g) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      genres:
        prev.genres.filter((el) => el !== g)
    }))
  }


  return (
    <div className={styles.Crear}>
      <div className={styles.formulario}>
        <h1 className={styles.h1} >Create Videogame</h1>
        <h4 className={styles.inputLabel}>Fill in the following form:</h4>
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          {/* --------------------------------------NAME---------------------------------------- */}
          <div>
         <h5 className={styles.inputLabel}>Name of the Videogame:</h5>
          <input
           className={errors.name && styles.danger}
           type='text'
            placeholder='Name...'
            name='name'
            value={values.name}
            onChange={(e) => handleChange(e)}
            />
           {errors.name && (
            <p className={`${styles.errorMessage} ${styles.error}`}>{errors.name}</p>
          )}
       </div>

          {/* --------------------------------------IMAGE---------------------------------------- */}
          <div>
            <h5 className={styles.inputLabel}>Put the cover of the game:</h5>
            <input
              
              type='text'
              placeholder='Image Url...'
              name='image'
              value={values.image}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* --------------------------------------DESCRIPTION---------------------------------------- */}
          <div>
            <h5 className={styles.inputLabel}>Game description:</h5>
            <input
              className={errors.description && 'danger'}
              type='text'
              placeholder='Description...'
              name='description'
              maxLength='100'
              value={values.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
    <p className={errors.description && styles.error}>{errors.description}</p>
    )}
          </div>
          {/* --------------------------------------RELEASED---------------------------------------- */}
          <div>
            <h5 className={styles.inputLabel}>Release date:</h5>
            <input
              type='date'
              placeholder='Date...'
              name="released"
              value={values.released}
              onChange={(e) => handleChange(e)}
            />
            {errors.released && (
    <p className={errors.released && styles.error}>{errors.released}</p>
    )}
          </div>
          {/* --------------------------------------RATING---------------------------------------- */}
          <div >
            <h5 className={styles.inputLabel}>Raiting:</h5>
            <input
              className={errors.rating && 'danger'}
              type="number"
              placeholder="Rating..."
              value={values.rating}
              name="rating"
              step={0.5}
              max={5.0}
              min={0.0}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.rating && (
       <p className={errors.rating && styles.error}>{errors.rating}</p>
    )}
          </div>
          {/* --------------------------------------PLATFORMS---------------------------------------- */}
          <div>
            <label >
              <h5 className={styles.inputLabel}> Choose a platform...</h5>
              <select
                // className={errors.platforms && 'danger'}
                name='Platforms'
                onChange={(e) => handleChangePlatform(e)}
                defaultValue={'default'}
              >
                {<option value="default" disabled>Platforms...</option>}
                {platforms.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  )
                })}
              </select>
            </label>
            {/* ----------------------------------------PLATFORMS LIST----------------------------------- */}
            <ul className='lista' >
              {values.platforms.length ? values.platforms.map((el, i) => (
                <div className='result' key={i}>
                  <li  className={styles.inputLabel}>  {el}  </li>
                    <button  className={styles.deleteButton}  onClick={(e) => { handleDeletePlatform(e, el) }}>x</button>
                 
                </div>
              ))
                : errors.platforms && (
                  <p className={errors.platforms && styles.error}>{errors.platforms}</p>
                  )
              }
            </ul>
          </div>
   {/* --------------------------------------GENRES---------------------------------------- */}
<div>
  <label className={errors.genres && 'danger'}>
    <h5 className={styles.inputLabel}> Choose a genre...</h5>
    <select onChange={(e) => handleChangeGenre(e)}
      className='Genres'
      name='Genres'
      defaultValue={'default'}
    >
      <option value="default" disabled>Genres...</option>
      {genres?.map((el, i) => {
        return (
          <option key={i} value={el}>
            {el}
          </option>
        )
      })
      }
    </select>
  </label>
  {/* ----------------------------------------GENRES LIST----------------------------------- */}
  <ul className='lista'>
    {values.genres.length ? values.genres.map((el, i) => (
      <div className='result' key={i}>
        <li className={styles.inputLabel}>{el}</li>
        <button className={styles.deleteButton} onClick={(e) => { handleDeleteGenre(e, el) }}>x</button>
      </div>)
    ) :
      errors.genres && (
        <p className={errors.genres && styles.error}>{errors.genres}</p>
      )
    }
  </ul>
</div>
          <button  type='submit' className={styles.inputLabel}>Create Videogame</button>



          <Link to="/home">
                <button>Volver a Home</button>
            </Link>
        </form>
      </div>
    </div>

  )
}

export default CreateGame
