import React from "react";
import { useState, useEffect } from "react";
import supabase from "../supabase";
import messi_img from "../Images/messi.jpg"; // Ensure you have the correct path
import Create_Team_Modale from "./Create_Team_Modale";

const Schedule = ({ sessionuser }) => {
  const [selectedSport, setSelectedSport] = useState([]);
  const [options, setOptions] = useState("");
  const [tournamenttables, setTournamentTables] = useState([]);
  const [result, setresult] = useState([]);
  const [simulate, setsimulate] = useState("simulate");
  const [rund, setrund] = useState(1);
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

  const generateRoundRobinSchedule = (teams) => {
    const schedule = [];
    const numTeams = teams.length;

    if (numTeams % 2 !== 0) {
      teams.push({ id: "bye", name: "Bye" });
    }

    for (let round = 0; round < teams.length - 1; round++) {
      const roundMatches = [];

      for (let i = 0; i < teams.length / 2; i++) {
        const home = teams[i];
        const away = teams[teams.length - 1 - i];

        if (home.id !== "bye" && away.id !== "bye") {
          roundMatches.push({
            home: home.teamname,
            away: away.teamname,
            home_score: 0,
            away_score: 0,
          });
        }
      }

      schedule.push(roundMatches);
      teams.splice(1, 0, teams.pop());
    }

    return schedule;
  };

  const simulateRound1 = () => {
    setsimulate("simulating....");
    for (let round = 0; round < result.length; round++) {
      for (let match = 0; match < result[round].length; match++) {
        const home = result[round][match].home;
        const away = result[round][match].away;
        const homeScore = Math.floor(Math.random() * 6);
        const awayScore = Math.floor(Math.random() * 6);

        console.log(`${home} ${homeScore} - ${awayScore} ${away}`);

        result[round][match].home_score = homeScore;
        result[round][match].away_score = awayScore;

        tournamenttables.map((team) => {
          if (team.teamname === home) {
            team.goals_scored += homeScore;
            team.no_matches_played += 1;
            if (homeScore > awayScore) {
              team.wins += 1;
              team.points += 3;
            } else if (homeScore === awayScore) {
              team.draws += 1;
              team.points += 1;
            } else {
              team.losses += 1;
            }
          }

          if (team.teamname === away) {
            team.goals_scored += awayScore;
            team.no_matches_played += 1;
            if (awayScore > homeScore) {
              team.wins += 1;
              team.points += 3;
            } else if (homeScore === awayScore) {
              team.draws += 1;
              team.points += 1;
            } else {
              team.losses += 1;
            }
          }
          return team;
        });

        console.log("tournamenttables", tournamenttables);
      }
    }

    tournamenttables.map(async (team) => {
      let { data, error } = await supabase
        .from(options)
        .update({
          goals_scored: team.goals_scored,
          no_matches_played: team.no_matches_played,
          wins: team.wins,
          draws: team.draws,
          losses: team.losses,
          points: team.points,
        })
        .eq("teamname", team.teamname);
      if (error) {
        console.log("error", error);
        return;
      }
      console.log("data", data);
    });

    setresult([...result]);
    setsimulate("simulation completed");
  };

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

    const result = generateRoundRobinSchedule(tournamenttables);
    setresult(result);

    console.log("result", result);
  };

  const next1 = async () => {
    setsimulate("simulate semifinals");

    let { data: football_asf, error } = await supabase
      .from(options)
      .select("*")
      .order("points", { ascending: false })
      .limit(4);

    if (error) {
      console.log("error", error);
      return;
    }
    console.log("football_asf", football_asf);
    setTournamentTables(football_asf);

    const result = [
      {
        home: football_asf[0].teamname,
        away: football_asf[3].teamname,
        home_score: 0,
        away_score: 0,
      },
      {
        home: football_asf[1].teamname,
        away: football_asf[2].teamname,
        home_score: 0,
        away_score: 0,
      },
    ];

    setresult([...result]);
    setrund(2);
  };

  const next3 = async () => {
    setsimulate("Finished tournament. Now go to the dashboard to view results.");
    setrund(4);
  };

  const next2 = async () => {
    setsimulate("simulate finals");

    let { data: football_asf, error } = await supabase
      .from(options)
      .select("*")
      .order("points", { ascending: false })
      .limit(2);

    if (error) {
      console.log("error", error);
      return;
    }
    console.log("football_asf", football_asf);
    setTournamentTables(football_asf);
    const result = [
      {
        home: football_asf[0].teamname,
        away: football_asf[1].teamname,
        home_score: 0,
        away_score: 0,
      },
    ];

    setresult([...result]);
    setrund(3);
  };

  const simulateRound2 = () => {
    setsimulate("simulating....");

    console.log("result" + result);

    let result_temp = [...result];

    console.log("result_temp" + result_temp);

    for (let i = 0; i < result_temp.length; i++) {
      const home = result_temp[i].home;
      const away = result_temp[i].away;
      const homeScore = Math.floor(Math.random() * 6);
      const awayScore = Math.floor(Math.random() * 6);

      result_temp[i].home_score = homeScore;
      result_temp[i].away_score = awayScore;

      tournamenttables.map((team) => {
        if (team.teamname === home) {
          team.goals_scored += homeScore;
          team.no_matches_played += 1;
          if (homeScore > awayScore) {
            team.wins += 1;
            team.points += 3;
          } else if (homeScore === awayScore) {
            team.draws += 1;
            team.points += 1;
          } else {
            team.losses += 1;
          }
        }

        if (team.teamname === away) {
          team.goals_scored += awayScore;
          team.no_matches_played += 1;
          if (awayScore > homeScore) {
            team.wins += 1;
            team.points += 3;
          } else if (homeScore === awayScore) {
            team.draws += 1;
            team.points += 1;
          } else {
            team.losses += 1;
          }
        }
        return team;
      });
    }

    // now update the database
    tournamenttables.map(async (team) => {
      let { data, error } = await supabase
        .from(options)
        .update({
          goals_scored: team.goals_scored,
          no_matches_played: team.no_matches_played,
          wins: team.wins,
          draws: team.draws,
          losses: team.losses,
          points: team.points,
        })
        .eq("teamname", team.teamname);
      if (error) {
        console.log("error", error);
        return;
      }
      console.log("data", data);
    });

    console.log("result_temp" + result_temp);

    setresult([...result]);

    setsimulate("simulation completed");
  };

  const simulateRound3 = () => {
    setsimulate("simulating....");

    console.log("result" + result);

    let result_temp = [...result];

    console.log("result_temp" + result_temp);

    const home = result_temp[0].home;
    const away = result_temp[0].away;
    const homeScore = Math.floor(Math.random() * 6);
    const awayScore = Math.floor(Math.random() * 6);

    result_temp[0].home_score = homeScore;
    result_temp[0].away_score = awayScore;

    tournamenttables.map((team) => {
      if (team.teamname === home) {
        team.goals_scored += homeScore;
        team.no_matches_played += 1;
        if (homeScore > awayScore) {
          team.wins += 1;
          team.points += 3;
        } else if (homeScore === awayScore) {
          team.draws += 1;
          team.points += 1;
        } else {
          team.losses += 1;
        }
      }

      if (team.teamname === away) {
        team.goals_scored += awayScore;
        team.no_matches_played += 1;
        if (awayScore > homeScore) {
          team.wins += 1;
          team.points += 3;
        } else if (homeScore === awayScore) {
          team.draws += 1;
          team.points += 1;
        } else {
          team.losses += 1;
        }
      }
      return team;
    });

    // now update the database
    tournamenttables.map(async (team) => {
      let { data, error } = await supabase
        .from(options)
        .update({
          goals_scored: team.goals_scored,
          no_matches_played: team.no_matches_played,
          wins: team.wins,
          draws: team.draws,
          losses: team.losses,
          points: team.points,
        })
        .eq("teamname", team.teamname);
      if (error) {
        console.log("error", error);
        return;
      }
      console.log("data", data);
    });

    console.log("result_temp" + result_temp);

    setresult([...result]);

    setsimulate("simulation completed");
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
          <div className="flex justify-center ">
            {rund == 1 && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={simulateRound1}
              >
                {simulate}
              </button>
            )}
            {rund == 2 && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={simulateRound2}
              >
                {simulate}
              </button>
            )}
            {rund == 3 && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={simulateRound3}
              >
                {simulate}
              </button>
            )}
            {rund == 4 && simulate == "Finished tournament" && (
              <button
                disabled
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
              >
                {simulate}
              </button>
            )}
            {rund == 1 && simulate == "simulation completed" && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={next1}
              >
                Next
              </button>
            )}
            {rund == 2 && simulate == "simulation completed" && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={next2}
              >
                Next
              </button>
            )}
            {rund == 3 && simulate == "simulation completed" && (
              <button
                className="text-white border-2 w-max p-4 bg-emerald-800 text-2xl hover:bg-emerald-950"
                onClick={next3}
              >
                Next
              </button>
            )}
          </div>

          {/* ast round */}
          {rund == 1 && (
            <div>
              {result.map((round, index) => {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <h1 className="text-2xl">{`Round ${index + 1}`}</h1>
                    <div className="grid gap-4">
                      {round.map((match, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-around items-center gap-2 border-2 border-gray-600 p-2 rounded-lg w-full text-lg"
                          >
                            <div className="text-2xl text-red-500 font-bold">
                              <p>{match.home_score}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-2xl">
                              <p className="text-red-500">
                                {match.home}
                                {match.home_score > match.away_score &&
                                  " is the Winner"}
                              </p>
                              <p>vs</p>
                              <p className="text-blue-600">
                                {match.away}
                                {match.home_score < match.away_score &&
                                  " is the Winner"}
                              </p>
                            </div>
                            <div className="text-2xl text-blue-500 font-bold">
                              <p>{match.away_score}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div>
            {rund == 2 && (
              <div>
                {result.map((match, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-around items-center gap-2 border-2 border-gray-600 p-2 rounded-lg w-full text-lg"
                    >
                      <div className="text-2xl text-red-500 font-bold">
                        <p>{match.home_score}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center text-2xl">
                        <p className="text-red-500">
                          {match.home}
                          {match.home_score > match.away_score &&
                            " is the Winner"}
                        </p>
                        <p>vs</p>
                        <p className="text-blue-600">
                          {match.away}
                          {match.home_score < match.away_score &&
                            " is the Winner"}
                        </p>
                      </div>
                      <div className="text-2xl text-blue-500 font-bold">
                        <p>{match.away_score}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            {rund == 3 && (
              <div>
                {result.map((match, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-around items-center gap-2 border-2 border-gray-600 p-2 rounded-lg w-full text-lg"
                    >
                      <div className="text-2xl text-red-500 font-bold">
                        <p>{match.home_score}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center text-2xl">
                        <p className="text-red-500">
                          {match.home}
                          {match.home_score > match.away_score &&
                            " is the Winner"}
                        </p>
                        <p>vs</p>
                        <p className="text-blue-600">
                          {match.away}
                          {match.home_score < match.away_score &&
                            " is the Winner"}
                        </p>
                      </div>
                      <div className="text-2xl text-blue-500 font-bold">
                        <p>{match.away_score}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
