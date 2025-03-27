import React, { useState } from 'react'
import Interests from './Interests'
import Profile from './Profile'
import Settings from './Settings'
import './app.css'

function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { name: 'Profile', component: Profile },
    { name: 'Interests', component: Interests },
    { name: 'Settings', component: Settings }
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div>
      {/* Tab Headers */}
      <div className='heading-container'>
        {tabs.map((t, index) => (
          <div 
            key={index}
            className={`heading ${activeTab === index ? "active" : ""}`} 
            onClick={() => setActiveTab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className='active-tab'>
        <ActiveComponent />
      </div>
    </div>
  )
}

export default TabForm;
