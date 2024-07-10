import React from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase";
import PointsTable from "./PointsTable";

const Schedule_dash = ({ sessionuser }) => {
  const [options, setOptions] = useState("");
  const [selectedSport, setSelectedSport] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchtournament = async () => {
      let { data: tournaments, error } = await supabase
        .from("tournaments")
        .select("name")
        .eq("created_by", sessionuser.id);
      if (error) {
        console.log("error", error);
        return;
      }

      console.log("tournaments", tournaments);
      setTournaments(tournaments);
    };

    fetchtournament();
  }, []);

  const handlechange = async (value) => {
    setOptions(value);
  };
  return (
    <div>
      <div className=" w-full h-full flex flex-col justify-start items-stretch gap-28 p-4 rounded-2xl opacity-80 text-black">
        {/* Tournament Name Input */}
        <div className="flex justify-evenly items-baseline  border-2 border-gray-600 rounded-lg p-4 w-full ">
          <h1 className="text-2xl">Select a tournament</h1>
          <select
            value={options}
            onChange={(e) => handlechange(e.target.value)}
            className="rounded-lg text-black border-black p-1"
          >
            <option value="" disabled>
              Select a Tournament
            </option>
            {tournaments.map((tournament, index) => {
              return (
                <option key={index} value={tournament.name}>
                  {tournament.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* points table */}
      <PointsTable options={options}/>
    </div>
  );
};

export default Schedule_dash;
