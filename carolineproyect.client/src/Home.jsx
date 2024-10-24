import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Common.css';

const App = () => {
    return (
        <div className="main_container">
            <div className="main-image">
                <div className="bottom-header-container">
                    <div className="bottom-header-item">
                        <h1>ARE YOU STRUGGLING TO CHOOSE YOUR COLLEGE?</h1>
                    </div>
                    <div className="bottom-container">
                        <div className="bottom-container-button">
                            <Link to="/calculator" style={{ textDecoration: 'none' }}>
                                <button className="custom-button">CLICK HERE</button>
                            </Link>                         
                        </div>
                        <div className="bottom-header-item">
                            <p>TO FIND THE RIGHT SCHOOL FOR YOU!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="second-section-title">
                <h2> Helping you to Navigate College Choices for a Brighter Financial Future.</h2>
            </div>
        </div>
    );
};

export default App;