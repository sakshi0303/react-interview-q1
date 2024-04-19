import React, { useEffect, useState } from "react";
import { getLocations, isNameValid } from "../mock-api/apis";
import "./InputForm.css";

const InputForm = () => {

    //name
    const [name, setName] = useState('');
    const [isvalid, setisvalid] = useState(true);

    //location
    const [locations, setlocaton] = useState([]);
    const [selectedlocation, setselectedlocation] = useState(locations.length>0?locations[0]:'');
    

    //table 
    const [data, setData] = useState([]);
    const [duplicatedata, setisDuplicate] = useState(false);

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
        // check if this name and location pair already present in data
        const isDuplicate=data.some(item=>item.name===name && item.location===selectedlocation);

        if(!isDuplicate){
            await setData([...data, { name, location: selectedlocation }]);
        }else{
            console.log('Duplicate entry found!');
            setisDuplicate(isDuplicate)
        }

        setName('');   
        setselectedlocation(locations.length>0?locations[0]:'');   
    };

    const handleClearTable = () => {
        setData([]);
    };

    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const locations = await getLocations();
                setlocaton(locations);
                setselectedlocation(locations.length>0?locations[0]:'');  

            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };
        fetchlocation();
    }, []);

    return (
        <div className="input-form-container">
            <div>
                
                <div style={{ float: 'left', marginRight: '10px' }}>Name:</div>
                <input type="text" value={name} onChange={handlenamechange} style={{ marginRight: '10px' }} />
                {!isvalid && <div style={{ color: 'red' }}>Name is taken</div>}
            </div>

            <div style={{ float: 'left', marginRight: '10px' }}>Location:</div>
            <select value={selectedlocation} onChange={handleLocationChange}>
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
            <div>
                <button onClick={handleAddRow}>Add</button>

                <button onClick={handleClearTable}>Clear</button>
                
                {duplicatedata && <div style={{ color: 'red' }}>Duplicate entry found!</div>}
            </div>
            <table>
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