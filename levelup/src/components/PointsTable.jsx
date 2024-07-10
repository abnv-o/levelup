import React, { useEffect, useState } from "react";
import supabase from "../supabase";

const PointsTable = ({ options }) => {
  console.log("options", options);
  const [tournamenttables, setTournamentTables] = useState([]);
  useEffect(() => {
    const fetchtournament = async () => {
      if(options === "") return;
      let { data: tournamentdetail, error } = await supabase
        .from(options)
        .select("*")
        .order("points", { ascending: false });
      if (error) {
        console.log("error", error);
        return;
      }
      console.log("Tournamentdetails", tournamentdetail);
      setTournamentTables(tournamentdetail ? tournamentdetail : []);
    };
    fetchtournament();
  }, [options]);

  return (
    <div>
      <section class="bg-gray-50  p-3 sm:p-5">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div class="bg-white text-black relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-black">
                <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">
                      Team
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Matches
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Wins
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Draws
                    </th>
                    <th scope="col" class="px-4 py-3">
                      loose
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tournamenttables?.map((table, index) => {
                    return (
                      <tr class="border-b dark:border-gray-700 text-black">
                        <th
                          scope="row"
                          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {table.teamname}
                        </th>
                        <td class="px-4 py-3">{table.no_matches_played}</td>
                        <td class="px-4 py-3">{table.wins}</td>
                        <td class="px-4 py-3">{table.draws}</td>
                        <td class="px-4 py-3">{table.losses}</td>
                        <td class="px-4 py-3">{table.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PointsTable;
