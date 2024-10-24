import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './Common.css';
import SchoolCard from './SchoolCard.jsx';

const Calculator = () => {
    const [schools, setSchools] = useState([]); 
    const [selectedSchools, setSelectedSchools] = useState({
        school1: '',
        school2: '',
        school3: ''
    }); 
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false); 

    // Cargar los datos del servidor al cargar el componente
    useEffect(() => {
        loadSchools(); 
    }, []);

    const loadSchools = () => {
        if (isLoading) return; 
        setIsLoading(true); 

        fetch(`https://localhost:7072/School/get-all?skip=${skip}`)
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

            fetch(`https://localhost:7072/School/filter?ids=${selectedSchoolIds}`)
                .then((response) => response.json())
                .then((data) => {

                    //GET RESULTS 

                })
                .catch((error) => console.error('Error fetching schools:', error))
                .finally(() => setIsLoading(false));
        }
        else {
/*            alert("You must select 3 schools to compare");*/
        }
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
                    onSelect={(e) => handleSelect('school1', e)}
                />
                <SchoolCard
                    schools={schools}
                    selectedSchool={selectedSchools.school2}
                    alreadySelected={selectedSchools}
                    onSelect={(e) => handleSelect('school2', e)}
                />
                <SchoolCard
                    schools={schools}
                    selectedSchool={selectedSchools.school3}
                    alreadySelected={selectedSchools}
                    onSelect={(e) => handleSelect('school3', e)}
                />
            </div>

            <div className="calculator-bottom-container">
                <p>*Subtract things from base tuition, including scholarships and aids</p>
                <button className="custom-button" onClick={compare()}>Compare</button>
            </div>
        </div>
    );
};

export default Calculator;
