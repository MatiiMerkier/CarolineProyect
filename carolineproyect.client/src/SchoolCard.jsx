import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './SchoolCard.css';
import rankA from '../public/rank_a.png'; 
import rankB from '../public/rank_b.png';
import rankC from '../public/rank_c.png';
import rankD from '../public/rank_d.png';
import rankF from '../public/rank_f.png'; 

const SchoolCard = ({schools, selectedSchool, onSelect, alreadySelected, compareData, compareStatus}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSchoolData, setSelectedSchoolData] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);


    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSelectSchool = (selectedSchool) => {
        setSelectedSchoolData(selectedSchool);
        onSelect(selectedSchool);
        setShowModal(false);
    };

    const getImageByAge = (roi) => {
        if (roi >= 40000) {
            return rankA;
        } else if (roi >= 30000 && roi < 40000) {
            return rankB;
        } else if (roi >= 20000 && roi < 30000) {
            return rankC;
        } else if (roi >= 10000 && roi < 20000) {
            return rankD;
        } else {
            return rankF;
        }
    };

    useEffect(() => {
        if (compareData && compareData.roi !== undefined) {
            const image = getImageByAge(compareData.roi);
            setCurrentImage(image);
        } else {
            setCurrentImage(null);  // Reset if compareData or Age is not available
        }
    }, [compareData]);

    return (
        <div className="card-main-container">

            {!compareStatus && (
                <div className="card-main-container-content">
                    <img src="../public/school.jpg" alt="icon"/>
                    <h4>{selectedSchoolData ? selectedSchoolData.Institution : 'Select a School'}</h4>
                    <h5>{selectedSchoolData ? selectedSchoolData.FieldOfStudy : ''}</h5>
                    <h6>{selectedSchoolData ? selectedSchoolData.State : ''}</h6>
                    <p>{selectedSchoolData ? '' : ''}</p>

                    <input
                        type="text"
                        readOnly
                        value={selectedSchoolData ? `${selectedSchoolData.Institution} (${selectedSchoolData.FieldOfStudy})` : 'Select a School'}
                        onClick={handleOpenModal}
                        className="school-input"
                    />


                    <Modal
                        show={showModal}
                        handleClose={handleCloseModal}
                        schools={schools}
                        selectedSchool={selectedSchool}
                        alreadySelected={alreadySelected}
                        onSelect={handleSelectSchool}
                    />
                </div>
            )}

            {compareStatus && (
                <div className="card-main-container-content">
                    <h4>{compareData.institution}</h4>
                    {currentImage && <img src={currentImage} alt="Age-based display" />}
                    <h1>{compareData.roi}</h1>
                    <h5>Years to Pay Off Debt: 0</h5>
                    <h5>401K : {compareData.earnings}</h5>
                </div>
            )}
        </div>
    );
};

export default SchoolCard;
