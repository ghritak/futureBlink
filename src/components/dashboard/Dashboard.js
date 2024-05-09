/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SideBar from '../side-bar/SideBar';
import FlowComponent from './FlowComponent';
import LoaderView from '../../views/LoaderView';
import { ReactFlowProvider } from 'reactflow';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const data = localStorage.getItem('USER_DATA');
    const token = localStorage.getItem('AUTH_TOKEN');
    const userData = { ...JSON.parse(data), token };
    setUser(userData);
    fetchFlowData(token);
  };

  const fetchFlowData = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/flow/getflow`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
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
    <ReactFlowProvider>
      <div className='w-screen h-screen bg-gray-300 flex'>
        <SideBar user={user} />
        {flowData ? (
          <div className='h-screen w-screen lg:w-3/4 xl:w-4/5'>
            <FlowComponent user={user} flowData={flowData} />
          </div>
        ) : (
          <div className='h-screen w-screen lg:w-3/4 xl:w-4/5'>
            <LoaderView />
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default Dashboard;
