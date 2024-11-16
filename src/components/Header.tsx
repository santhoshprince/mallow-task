import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const UserHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>

      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserHeader;
