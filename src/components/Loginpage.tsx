// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: values.email,
        password: values.password,
      });

      // Store the token from the response
      localStorage.setItem('token', response.data.token);
      message.success('Login successful!');
      navigate('/users'); // Redirect to user list layout
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <h2>Login</h2>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
