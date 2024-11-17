

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../redux/actions/userActions';
import { Button, Input, Form, Modal } from 'antd';
import { User } from '../types/User';
import {EditOutlined} from "@ant-design/icons";

interface EditUserProps {
  user: User;
  viewMode: 'table' | 'card';
}

const EditUser: React.FC<EditUserProps> = ({ user ,viewMode}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    const updatedUser: User = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar,
    };

    dispatch(updateUserDetails(updatedUser));
    setIsVisible(false);
  };

  return (
    <>
     {viewMode === 'table' ? (
        <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
          Edit
        </Button>
      ) : (
        <Button
          icon={<EditOutlined />}
          shape="circle"
          className="edit-btn"
          onClick={showModal}
        />
      )}
      <Modal
        title="Edit User"
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

export default EditUser;
