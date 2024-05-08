/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SideBar from '../side-bar/SideBar';
import FlowComponent from './FlowComponent';
import LoaderView from '../../views/LoaderView';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const data = localStorage.getItem('USER_DATA');
    const token = localStorage.getItem('AUTH_TOKEN');
    setUser(JSON.parse(data));
    fetchFlowData(token);
  };

  const fetchFlowData = async (token) => {
    try {
      const response = await fetch('http://localhost:4000/api/flow/getflow', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const { flowData: flows } = data;
        setFlowData(flows);
      }
    } catch (err) {
      console.log('Could not fetch flow data', err);
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-300 flex'>
      <div className='h-screen w-1/5 bg-white'>
        <SideBar user={user} />
      </div>
      {flowData ? (
        <div className='h-screen w-4/5'>
          <FlowComponent flowData={flowData} />
        </div>
      ) : (
        <div className='w-4/5 h-screen'>
          <LoaderView />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
