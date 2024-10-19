import './SchoolCard.css';
import './Common.css';
import React from 'react';

const CardComponent = ({ name, major }) => {
    return (
        <div className="card-main-container">
            <h4>{name}</h4>
            <p>{major}</p>
        </div>
    );
};

export default CardComponent;
