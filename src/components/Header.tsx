import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";

const UserHeader: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <>
      {isLoggedIn && ( // Show the header only if the user is logged in
        <div className="app-header">
          <h1 className="header-title">User</h1>
          <Button
            type="primary"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{ backgroundColor: "#ff4d4f" }}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
};

export default UserHeader;
