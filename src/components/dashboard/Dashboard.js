import { useEffect, useState } from 'react';
import SideBar from '../side-bar/SideBar';
import FlowComponent from './FlowComponent';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const data = localStorage.getItem('USER_DATA');
    setUser(JSON.parse(data));
  };

  return (
    <div className='w-screen h-screen bg-gray-300 flex'>
      <div className='h-screen w-1/5 bg-white'>
        <SideBar user={user} />
      </div>
      <div className='h-screen w-4/5'>
        <FlowComponent user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
