import React, { useEffect, useState } from "react";
import { getLocations,isNameValid } from "../mock-api/apis";


const InputForm = () => {

    //name
    const [name, setName] = useState('');
    const [isvalid,setisvalid]=useState(true);

    const handlenamechange = async (event) => {
        console.log(event.target.value);
        setName(event.target.value);
        const isValid = await isNameValid(event.target.value)
        setisvalid(isValid)
        console.log(isValid)
    };

    //location
    const [selectedlocation, setselectedlocation] = useState('');
    const [locations, setlocaton] = useState([]);
    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const locations = await getLocations();
                setlocaton(locations);
            } catch (error) {
                console.error('Error fetching locations', error);
            }
        };
        fetchlocation();
    },[]);
    const handleLocationChange = (event) => {
        console.log(event.target.value)
        setselectedlocation(event.target.value)
    }

    return (
        
        <div>
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
        </div>
    )

}

export default InputForm;