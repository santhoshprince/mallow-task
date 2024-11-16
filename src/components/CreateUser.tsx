// src/components/CreateUser.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/actions/userActions';
import { Button, Input, Form, Modal } from 'antd';
import { User } from '../types/User';

const CreateUser: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    const newUser: User = {
      id: Date.now(),
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    };

    dispatch(createUser(newUser));
    setIsVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create User
      </Button>
      <Modal
        title="Create New User"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Avatar URL">
            <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
