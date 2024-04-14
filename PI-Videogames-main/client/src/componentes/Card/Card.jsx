import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
    const {
        name,
        img,
        genres,
        rating,

    } = props

    
    const { card, cardImage, h3 } = styles
    return (

        <div className={card}>
            <h3 className={h3}>{name?.length > 24 ? name.slice(0, 23) : name}</h3>
            <div className={cardImage} style={{ backgroundImage: `url(${img})` }} />
            <h6> {genres}</h6>
            <h6> {rating}</h6>
        </div>

    )
}

export default Card
