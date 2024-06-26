import React from "react";
import Cricket_image from "../Images/Cricket.jpg"
import Badmintion_image from "../Images/Badmintion.jpg"

const Content = () => {
  return (
    <div className="mt-6">
      <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              ABOUT US
            </h2>
            <p class="mb-4">
              Welcome to LEVELUP, The ultimate solution for sports event
              management.Our app is designed to streamline the entire process of
              organising sports events from scheduling matches to tracking
              scores and everything in between
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img src={Cricket_image} className="rounded-md"></img>
            <img src={Badmintion_image} className="rounded-md mt-6"></img>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
