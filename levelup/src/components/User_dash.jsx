import React, { useState, useEffect } from 'react';

const UserDash = ({sessionuser}) => {

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="user image" className='size-36' />
        <h1 className='text-4xl font-bold'>{sessionuser.username}</h1>
        <p className='text-lg'>{sessionuser.email}</p>
      </div>
    </div>
  );
};

export default UserDash;