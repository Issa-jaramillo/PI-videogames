import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';


const LandingPage = () => {
    
    return (
        <div className={styles.landingpage}>
            <div>
                <h1 style={{ margin: "0" }}> Welcome to Videogames aplication</h1>
                <h4 >You will be able to explore, create and play your favorite games.</h4>
                <Link to='/home'>
                    <button >Enter</button>
                </Link>
            </div>
        </div>
    )
}
export default LandingPage;
