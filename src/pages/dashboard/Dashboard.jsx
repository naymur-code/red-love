import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const Dashboard = () => {
  const {user}=useContext(AuthContext)
  return (
    <div>
      <h1>welcomen {user?.displayName}!</h1>
      
    </div>
  );
};

export default Dashboard;