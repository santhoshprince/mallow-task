import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Card,Checkbox } from 'antd';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const defaultCredentials = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);

    if (
      values.email !== defaultCredentials.email ||
      values.password !== defaultCredentials.password
    ) {
      message.error('User not found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: values.email,
        password: values.password,
      });

      console.log('Login successful', response.data); 

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      message.success('Login successful!');
      navigate('/users'); 
    } catch (error: any) {
      console.error('Login error:', error);

     
      if (error.response && error.response.data.error) {
        message.error(error.response.data.error);
      }
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <Card
        bordered={false}
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
      >
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
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
         
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;


