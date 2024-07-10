import React, { useState } from 'react';
import Teams_icon from '../components/Teams_icon';
import Trophy_icon from '../components/Trophy_icon';
import Dashboard_icon from '../components/Dashboard_icon';
import User_icon from '../components/User_icon';
import User_dash from '../components/User_dash';
import Tournament_dash from '../components/Tournament_dash';
import Teams_dash from '../components/Teams_dash';
import Schedule_dash from '../components/Schedule_dash';
import Schedule from '../components/Schedule';

function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const[sessionuser,setsessionuser]=useState(localStorage.getItem('session_user')?JSON.parse(localStorage.getItem('session_user')):'');

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
            className={`cursor-pointer mb-2 ${activeTab === 'tournaments' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('tournaments')}
          >
           <div className='flex gap-2'>
            <Trophy_icon />
            <p> Tournaments</p>
            </div>
          </li>
          {/* ...more sidebar items */}
          <li 
            className={`cursor-pointer mb-2 ${activeTab === 'schedule' ? 'text-blue-500' : ''}`}
            onClick={() => handleTabClick('schedule')}
          >
           <div className='flex gap-2'>
            <Trophy_icon />
            <p> Schedule</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Content Viewport */}
      <div className="w-10/12 px-4 overflow-y-scroll">
        {activeTab === 'overview' && (
          <div>
            {/* ...content for Overview tab */}
            <User_dash sessionuser={sessionuser}/>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <div>
            {/* ...content for dashboard tab */}
            <Schedule_dash sessionuser={sessionuser}/>
          </div>
        )}
        {activeTab === 'teams' && (
          <div>
            {/* ...content for teams tab */}
            <Teams_dash sessionuser={sessionuser}/>
          </div>
        )}
        
        {activeTab === 'tournaments' && (
          <div>
            {/* ...content for tournament tab */}
            <Tournament_dash sessionuser={sessionuser}/>
          </div>
        )}

{activeTab === 'schedule' && (
          <div>
            {/* ...content for tournament tab */}
            <Schedule sessionuser={sessionuser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
