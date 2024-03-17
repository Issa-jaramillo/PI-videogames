import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landingpage}>
            <div className={styles.content}>
                <h1 className={styles.title}>𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 𝖁𝖎𝖉𝖊𝖔𝖌𝖆𝖒𝖊𝖘 𝕬𝖕𝖕𝖑𝖎𝖈𝖆𝖙𝖎𝖔𝖓</h1>
                <h4 className={styles.subtitle}> 𝕰𝖝𝖕𝖑𝖔𝖗𝖊, 𝖈𝖗𝖊𝖆𝖙𝖊, 𝖆𝖓𝖉 𝖕𝖑𝖆𝖞 𝖞𝖔𝖚𝖗 𝖋𝖆𝖛𝖔𝖗𝖎𝖙𝖊 𝖌𝖆𝖒𝖊𝖘.</h4>
              
                <Link to='/home'>
                    <button className={styles.button}>𝖘𝖙𝖆𝖗𝖙</button>
                </Link>
                
            </div>
        </div>
    );
};

export default LandingPage;
