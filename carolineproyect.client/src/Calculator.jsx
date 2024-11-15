import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './Common.css';
import SchoolCard from './SchoolCard.jsx';

const Calculator = () => {
    const [schools, setSchools] = useState([]);
    const [compareResults, setCompareResults] = useState([]);
    const [compareStatus, setCompareStatus] = useState(false); 
    const [selectedSchools, setSelectedSchools] = useState({
        school1: '',
        school2: '',
        school3: ''
    }); 
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false); 
    const apiUrl = import.meta.env.VITE_API_URL;

    // Cargar los datos del servidor al cargar el componente
    useEffect(() => {
        loadSchools(); 
    }, []);

    const loadSchools = () => {
        if (isLoading) return; 
        setIsLoading(true); 

        fetch(`${apiUrl}/School/get-all?skip=${skip}`)
            .then((response) => response.json())
            .then((data) => {
                const formattedSchools = data.map((school) => ({
                    Id: school.id,
                    Institution: school.institution,
                    Disabled: false,
                    FieldOfStudy: school.fieldOfStudy,
                    State: school.state
                }));

                const newSchools = formattedSchools.filter(school =>
                    !schools.some(existingSchool => existingSchool.Id === school.Id)
                );

                setSchools((prevSchools) => [...prevSchools, ...newSchools]);

                setSkip((prevSkip) => prevSkip + 20);
            })
            .catch((error) => console.error('Error fetching schools:', error))
            .finally(() => setIsLoading(false)); 
    };

    const handleSelect = (card, selected) => {

        setSelectedSchools((prevSelectedSchools) => {
            const updatedSelection = { ...prevSelectedSchools, [card]: selected.Id };

            const updatedSchools = schools.map((school) => {
                const isDisabled = updatedSelection.school1 === school.Id || updatedSelection.school2 === school.Id || updatedSelection.school3 === school.Id;

                return { ...school, Disabled: isDisabled };
            });

            setSchools(updatedSchools); 
            return updatedSelection;
        });
    };

    const compare = () => {
        if (selectedSchools.school1 != '' && selectedSchools.school2 != '' && selectedSchools != '') {

            const selectedSchoolIds = Object.values(selectedSchools).filter(id => id);

            fetch(`${apiUrl}/School/compare`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedSchoolIds)
            })
                .then((response) => response.json())
                .then((data) => {
                    setCompareResults(data.result);
                    setCompareStatus(data.status);
                })
                .catch((error) => console.error('Error fetching schools:', error))
                .finally(() => setIsLoading(false));
        }
        else {
            alert("You must select 3 schools to compare");
        }
        return;
    };

    return (
        <div className="main-container">
            <h1>Financial Calculator</h1>
            <h2>College Cost Comparison Tool</h2>
            <p>Compare your financial aid award letters to help determine which school is best for you</p>

            <hr />

            <h3>Select Up To Three Schools</h3>

            <div className="cards-container">
                <SchoolCard
                    schools={schools}
                    selectedSchool={selectedSchools.school1}
                    alreadySelected={selectedSchools}
                    compareData={compareResults[0]}
                    compareStatus={compareStatus}
                    onSelect={(e) => handleSelect('school1', e)}
                />
                <SchoolCard
                    schools={schools}
                    selectedSchool={selectedSchools.school2}
                    alreadySelected={selectedSchools}
                    compareData={compareResults[1]}
                    compareStatus={compareStatus}
                    onSelect={(e) => handleSelect('school2', e)}
                />
                <SchoolCard
                    schools={schools}
                    selectedSchool={selectedSchools.school3}
                    alreadySelected={selectedSchools}
                    compareData={compareResults[2]}
                    compareStatus={compareStatus}
                    onSelect={(e) => handleSelect('school3', e)}
                />
            </div>

            {!compareStatus && (
                <div className="calculator-bottom-container">
                    <p>*Subtract things from base tuition, including scholarships and aids</p>
                    <button className="custom-button-compare" onClick={compare}>Compare</button>
                </div>
            )}
            {compareStatus && (
                <div className="calculator-bottom-container-compare">
                    <h6> Rating A-F </h6>
                    <p>(Age You Can Retire)</p>
                    <div className="rating-scale">
                        <p>A: 55 And Below</p>
                        <p>B: 56-67</p>
                        <p>C: 68-70</p>
                        <p>D: 71-75</p>
                        <p>F: 75+</p>
                    </div>
                    <button className="custom-button-compare" onClick={() => setCompareStatus(false)}>BACK</button>
                </div>
            )}

        </div>
    );
};

export default Calculator;
