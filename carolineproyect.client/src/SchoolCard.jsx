import React, { useState } from 'react';
import Modal from './Modal';
import './SchoolCard.css';

const SchoolCard = ({schools, selectedSchool, onSelect, alreadySelected}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSchoolData, setSelectedSchoolData] = useState(null);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSelectSchool = (selectedSchool) => {
        setSelectedSchoolData(selectedSchool);
        onSelect(selectedSchool);
        setShowModal(false);
    };

    return (
        <div className="card-main-container">

            <h4>{selectedSchoolData ? selectedSchoolData.Institution : 'Select a School'}</h4>
            <h5>{selectedSchoolData ? selectedSchoolData.FieldOfStudy : ''}</h5>
            <h6>{selectedSchoolData ? selectedSchoolData.State : ''}</h6>
            <p>{selectedSchoolData ? '' : ''}</p> `

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
    );
};

export default SchoolCard;
