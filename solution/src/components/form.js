import React, { useEffect, useState } from "react";
import { getLocations, isNameValid } from "../mock-api/apis";
import "./InputForm.css";

const InputForm = () => {

    //name
    const [name, setName] = useState('');
    const [isvalid, setisvalid] = useState(true);


    //location
    const [locations, setlocaton] = useState([]);
    const [selectedlocation, setselectedlocation] = useState(locations.length > 0 ? locations[0] : '');


    //table 
    const [data, setData] = useState([]);


    const handlenamechange = async (event) => {
        console.log(event.target.value);
        setName(event.target.value);
        const isValid = await isNameValid(event.target.value)
        setisvalid(isValid)
        console.log(isValid)
    };

    const handleLocationChange = async (event) => {
        console.log(event.target.value)
        await setselectedlocation(event.target.value)
    }

    const handleAddRow = async () => {

        //check if name is empty
        if (name.trim() === '') {
            alert("name cannot be empty");
            return;
        }
        console.log(isvalid)
        if (!isvalid) {
            alert("name cannot be " + name.trim());
            return;
        }
        // check if this name and location pair already present in data
        const isDuplicate = data.some(item => item.name === name && item.location === selectedlocation);

        if (isDuplicate) {
            alert("duplicate records cannot be inserted")
            return;
        }

        await setData([...data, { name, location: selectedlocation }]);
        setName('');
        setselectedlocation(locations.length > 0 ? locations[0] : '');
    };

    const handleClearTable = () => {
        setData([]);
        setName('');
        setselectedlocation(locations[0]);
        setisvalid(true);

    };

    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const locations = await getLocations();
                setlocaton(locations);
                setselectedlocation(locations.length > 0 ? locations[0] : '');

            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };
        fetchlocation();
    }, []);

    return (
        <div className="input-form-container">
            <div className="name-item">
                <div className="input-name-row">
                    <div className="input-label">Name:</div>
                    <input type="text" value={name} onChange={handlenamechange} className="input-field" />
                </div>
                {!isvalid && <div className="error-message">the name has already been taken</div>}
            </div>

            <div className="input-row">
                <div className="input-label">Location:</div>

                <select value={selectedlocation} onChange={handleLocationChange} className="select-field">
                    {locations.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>


            <div className="input-row">
                <button onClick={handleAddRow} className="btn">Add</button>
                <button onClick={handleClearTable} className="btn">Clear</button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.location}</td>

                        </tr>
                    ))}
                    
                </tbody>
            </table>

        </div>
    )

}

export default InputForm;