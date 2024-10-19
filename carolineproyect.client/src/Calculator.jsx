import React from 'react';
import './Calculator.css';
import './Common.css';
import SchoolCard from './SchoolCard.jsx'

const Calculator = () => {
    return (
        <div className="main-container">
            <h1>Financial Calculator</h1>
            <h2>College Cost Comparison Tool</h2>
            <p>Compare your financial aid award letters to help determine wich school is best for you</p>

            <hr></hr>

            <h3>Select Up To Three Schools</h3>

            <div className="cards-container">
                <SchoolCard name="School 1" major={20} />
                <SchoolCard name="School 2" major={20} />
                <SchoolCard name="School 3" major={20} />
            </div>

            <div className="calculator-bottom-container">
                <p>*Subtract things from base tuition, including scholarships and aids</p>
                <button class="custom-button">Compare</button>
            </div>
        </div>
    );
};

export default Calculator;