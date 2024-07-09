import React, { useEffect, useState } from 'react';
import supabase from '../supabase.js';

const User_dash = () => {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      // Assuming you have a session or a way to identify the user
      const userSession = supabase.auth.session();

      if (userSession) {
        const { data, error } = await supabase
          .from('users')
          .select('username, email')
          .eq('id', userSession.user.id) // Assuming 'id' is how users are identified
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUser({ username: data.username, email: data.email });
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="user image" className='size-36' />
        <h1 className='text-4xl font-bold'>{user.username}</h1>
        <p className='text-lg'>{user.email}</p>
      </div>
    </div>
  );
}

export default User_dash;