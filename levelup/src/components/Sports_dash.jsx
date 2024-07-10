import supabase from '../supabase.js'
import React, { useState } from 'react';

const Sports_dash = () => {
  const [selectedSport, setSelectedSport] = useState('');

  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  }; 

  return (
    <div>
      <h1>Select Your Sport</h1>
      <select value={selectedSport} onChange={handleChange}>
        <option value="" disabled>Select a sport</option>
        <option value="soccer">Football</option>
        <option value="basketball">Basketball</option>
        <option value="baseball">Cricket</option>
        <option value="tennis">Kabaddi</option>
        <option value="hockey">Hockey</option>
      </select>
      {selectedSport && (
        <div>
          <h2>You selected: {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}</h2>
        </div>
      )}
    </div>
  );
};

export default Sports_dash;