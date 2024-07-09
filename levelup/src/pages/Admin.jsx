import React, { useState } from 'react';
import Teams_icon from '../components/Teams_icon';
import Sports_icon from '../components/Sports_icon';
import Trophy_icon from '../components/Trophy_icon';
import Dashboard_icon from '../components/Dashboard_icon';
import User_icon from '../components/User_icon';

function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-2/12 bg-gray-200 p-4 h-full">
        <ul className='flex flex-col justify-center gap-10'>
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'overview' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
         <div className='flex gap-2'>
            <User_icon />
            <p> User</p>
            </div>
          </li>
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'dashboard' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
           <div className='flex gap-2'>
            <Dashboard_icon />
            <p> Dashboard</p>
            </div>
          </li>
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'teams' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('teams')}
          >
            <div className='flex gap-2'>
            <Teams_icon />
            <p> Teams</p>
            </div>
          </li>
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'sports' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('sports')}
          >
            <div className='flex gap-2'>
            <Sports_icon />
            <p> Sports</p>
            </div>
          </li>
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'tournaments' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('tournaments')}
          >
           <div className='flex gap-2'>
            <Trophy_icon />
            <p> Tournaments</p>
            </div>
          </li>
          {/* ...more sidebar items */}
        </ul>
      </div>

      {/* Content Viewport */}
      <div className="w-10/12 p-4">
        {activeTab === 'overview' && (
          <div>
            {/* ...content for Overview tab */}
          </div>
        )}
        {activeTab === 'analytics' && (
          <div>
            {/* ...content for Analytics tab */}
          </div>
        )}
        {/* ...content for other tabs */}
      </div>
    </div>
  );
}

export default Admin;
