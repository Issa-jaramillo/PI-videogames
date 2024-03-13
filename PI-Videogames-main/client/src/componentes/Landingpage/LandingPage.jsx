import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';

const LandingPage = () => {
  return ( 
    <div className={styles.landingPage}>
      <div className={styles.landingPage}>
        <h1>Bienvenido a la Aplicación</h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>  
  );
};

export default LandingPage;
