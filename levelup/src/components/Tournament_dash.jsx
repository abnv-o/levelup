import React, { useState } from "react";
import messi_img from "../Images/messi.jpg"; // Ensure you have the correct path
import supabase from "../supabase.js";
const TournamentDash = ({ sessionuser }) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [message, setmessage] = useState("Submit")

  const handleChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleTournamentNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const handleSubmit = async (event) => {
    setmessage("Submitting...")
    event.preventDefault(); // Prevent the form from refreshing the page
    const tableName = `${selectedSport}_${tournamentName}`
      .replace(/\s+/g, "_")
      .toLowerCase();

    const createTableQuery = `
    CREATE TABLE ${tableName}(
    id SERIAL PRIMARY KEY,
    teamname TEXT,
    players JSON,
    no_matches_played INTEGER,
    wins INTEGER,
    losses INTEGER,
    draws INTEGER,
    goals_scored INTEGER,
    points INTEGER
    );
    `;

    try {
      let { data: tablefetch, error: tablefetcherror } = await supabase
        .from("tournaments")
        .select("name")
        .eq("name", tableName);

      if (tablefetcherror) throw tablefetcherror;

      if (tablefetch.length > 0) {
        alert("Tournament name already exists");
        return;
      }

      let { data, error } = await supabase.rpc("create_tournament_table", {
        table_name: tableName,
      });
      if (error) throw error;
      console.log("table created successfully:", data);

      const { data: tournamentdetail, error: tournamentdetail_error } =
        await supabase
          .from("tournaments")
          .insert([{ created_by: sessionuser.id, name: tableName }])
          .select()
          

      if (tournamentdetail_error) throw tournamentdetail_error;

      console.log(
        "tournament details inserted successfully:",
        tournamentdetail
      );
      setmessage("Submitted Successfully")
    } catch (error) {
      console.error("error creating table:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="absolute -z-10 ">
        <div className="h-screen w-full absolute z-1 bg-black opacity-60"></div>
        <img
          src={messi_img}
          alt="image background"
          className="w-screen h-screen"
        />
      </div>

      <div className="bg-black w-1/2 h-3/4 flex flex-col justify-start items-stretch gap-28 p-4 rounded-2xl opacity-80 text-white">
        {/* Tournament Name Input */}
        <div className="flex justify-evenly items-baseline  border-2 border-gray-600 rounded-lg p-4 w-full ">
          <h1 className="text-2xl">Enter Tournament Name</h1>
          <input
            type="text"
            value={tournamentName}
            onChange={handleTournamentNameChange}
            placeholder="Enter Tournament Name"
            className="mt-4 p-2 rounded-lg border-2 border-gray-600 text-black"
          />
        </div>

        {/* sport selector */}

        <div className="w-full flex justify-evenly border-2 rounded-lg p-4 border-gray-600">
          <h1 className="text-2xl ">Select Your Sport</h1>
          <select
            value={selectedSport}
            onChange={handleChange}
            className="rounded-lg text-black"
          >
            <option value="" disabled>
              Select a sport
            </option>
            <option value="Football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="Cricket">Cricket</option>
            <option value="Kabaddi">Kabaddi</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
        >
        {message}
        </button>
      </div>
    </div>
  );
};

export default TournamentDash;
