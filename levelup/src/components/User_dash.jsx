import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDash = ({sessionuser}) => {
  const navigate = useNavigate();
  
  const logout = () => {
    // Clear session user from  state management 
    localStorage.removeItem('session_user');
    // Navigate back to signin page
    navigate('/signin');
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="user image" className='size-36' />
        <h1 className='text-4xl font-bold'>{sessionuser.username}</h1>
        <p className='text-lg'>{sessionuser.email}</p>
        <button onClick={logout} className='mt-4 px-4 py-2 bg-red-500 text-white rounded'>Logout</button> 
      </div>
    </div>
  );
};

export default UserDash;