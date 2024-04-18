import React,{useState} from "react";


const DropDown = () =>{
    const [selectedlocation,setselectedlocation]=useState('');
    const [locations]=useState(['x','y','z']);
    const handleLocationChange=(event)=>{
        setselectedlocation(event.target.value)

    }

    return (
        <div>
            <div style={{float:'left',marginRight:'10px'}}>Location:</div>
            <select value={selectedlocation} onChange={handleLocationChange}>
                {locations.map((location)=>(
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>


        </div>
    )

}

export default DropDown;