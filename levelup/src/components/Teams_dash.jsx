import React from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase";
import messi_img from "../Images/messi.jpg"; // Ensure you have the correct path
import Create_Team_Modale from "./Create_Team_Modale";

const Teams_dash = ({ sessionuser }) => {
  const [modale, setmodale] = useState(false);
  const [selectedSport, setSelectedSport] = useState([]);
  const [options, setOptions] = useState("");
  const [tournamenttables, setTournamentTables] = useState([]);
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
      setSelectedSport(tournaments);
    };

    fetchtournament();
  }, []);

  const handlechange = async (value) => {
    setOptions(value);

    let { data: tournamenttables, error: tournamenttablerror } = await supabase
      .from(value)
      .select("*");
    if (tournamenttablerror) {
      console.log("error", tournamenttablerror);
      return;
    }
    console.log("tournamenttables", tournamenttables);
    setTournamentTables(tournamenttables);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="absolute -z-10 ">
          <div className="h-screen w-full absolute z-1 bg-black opacity-60"></div>
          <img
            src={messi_img}
            alt="image background"
            className="w-screen h-screen"
          />
        </div>

        <div className="bg-black w-full h-full flex flex-col justify-start items-stretch gap-28 p-4 rounded-2xl opacity-80 text-white">
          {/* Tournament Name Input */}
          <div className="flex justify-evenly items-baseline  border-2 border-gray-600 rounded-lg p-4 w-full ">
            <h1 className="text-2xl">Select a tournament</h1>
            <select
              value={options}
              onChange={(e) => handlechange(e.target.value)}
              className="rounded-lg text-black"
            >
              <option value="" disabled>
                Select a Tournament
              </option>
              {selectedSport.map((tournament, index) => {
                return (
                  <option key={index} value={tournament.name}>
                    {tournament.name}
                  </option>
                );
              })}
            </select>
          </div>

          {tournamenttables.length == 0 ? (
            <div className="text-2xl text-center">No Teams to display</div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="text-2xl text-white text-center mb-4">
                Team Name
              </h1>
              <div className="flex justify-center items-center gap-10 flex-wrap">
                {tournamenttables.map((team, index) => {
                  return (
                    <div className="">
                      <div
                        key={index}
                        className="flex justify-evenly items-center border-2 border-gray-600 rounded-lg p-4 w-max  "
                      >
                        <h1 className="text-2xl text-white">{team.teamname}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            className="bg-red-400 w-32 rounded-lg p-4 absolute bottom-2 right-5"
            onClick={() => setmodale(true)}
          >
            Create Team
          </button>
          {modale && (
            <Create_Team_Modale setmodale={setmodale} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams_dash;
