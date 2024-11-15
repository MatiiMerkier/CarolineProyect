import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, selectedSchool, onSelect, schools, alreadySelected}) => {
    const [filter, setFilter] = useState(''); // Estado para el filtro
    const [filteredSchools, setFilteredSchools] = useState([]); // Estado para las escuelas filtradas
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchSchools = async (filter) => {
            setLoading(true);
            try {
                const response = await fetch(filter ? `${apiUrl}/School/filter?filter=${filter}` : `${apiUrl}/School/get-all?skip=0 `);
                const data = await response.json();

                const formattedSchools = data.map((school) => ({
                    Id: school.id,
                    Institution: school.institution,
                    Disabled: false,
                    FieldOfStudy: school.fieldOfStudy,
                    State: school.state
                }));

                // Aquí actualiza el estado de Disabled según las escuelas seleccionadas
                const updatedSchools = formattedSchools.map(school => ({
                    ...school,
                    Disabled: alreadySelected.school1 == school.Id || alreadySelected.school2 == school.Id || alreadySelected.school3 == school.Id
                }));

                setFilteredSchools(updatedSchools);

            } catch (error) {
                console.error('Error fetching schools:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce
        const handler = setTimeout(() => {
            fetchSchools(filter);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [filter, selectedSchool, schools]); // Añadir selectedSchool y schools a las dependencias


    // Block Scroll
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset'; 
        };
    }, [show]);

    if (!show) {
        return null;
    }

    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-backdrop') {
            handleClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="close-icon" onClick={handleClose}>
                    &times;
                </button>
                <p>Select a School</p>

                <input
                    type="text"
                    placeholder="Filter by Institution or Field of Study"
                    value={filter}
                    className="filter-input"
                    onChange={(e) => setFilter(e.target.value)}
                />

                {loading && <p>Loading...</p>} 

                <ul className="school-list">
                    {filteredSchools.map((school, index) => (
                        <li key={`modal-${school.Id}-${index}`}>
                            <button
                                onClick={() => onSelect(school)}
                                disabled={school.Disabled}
                                className={selectedSchool === school.Id ? 'selected' : ''}
                            >
                                {school.Institution} ({school.FieldOfStudy})
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
