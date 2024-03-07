import React from "react";
import MainNav from "./MainNav";
import "./Dashboeard.css";
import guardian from "../../img/guardian.png";

const Dashboard = () => {
  const opportunities = [1, 2, 3];
  return (
    <section>
      <MainNav />
      <section className="p-8 pr-32 pl-32 bg-queen-white h-full">
        <h1 className="uppercase text-queen-black login-title font-anton">
          welcome back, kaleshe
        </h1>
        <div className="dashboard_grid">
          <div className="grid-items details pt-2 pl-0">
            <p className="opportunity_p">Recommended opportunities for you!</p>
            <ul>
              {opportunities?.map((list) => (
                <li key={list} className="pt-4">
                  <div className="top_data bg-white p-6 rounded-2xl">
                    <div className="flex items-center gap-2.5 justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-full mr-2"
                          src={guardian}
                          alt="Jese imae"
                        />
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white uppercase rounded-full">
                              The guardian
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex item-center">
                        <p className="font-bold text-queen-black pr-2">
                          Budget
                        </p>
                        <p className="text-queen-black pr-2">Under 1k</p>
                        <p className="font-bold pr-2">Deadline</p>
                        <p className="text-queen-black">2 Mar 2024</p>
                      </div>
                    </div>
                    <div className="flex content-start">
                      <p className="text-2xl mr-4 text-queen-black">
                        Email marketing
                      </p>
                      <button
                        type="button"
                        className="text-queen-black bg-queen-yellow hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Yellow
                      </button>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-lg text-queen-black pt-4">
                        ‘Think: Sustainability’ is a podcast about practical
                        solutions for a bette.....
                      </p>
                      <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        View
                      </button>{" "}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid-items p-8 pt-0 right-opportunity">
            <div className="opp_top rounded-2xl">top</div>
            <div className="opp_down">down</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
