import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/userActions";
import { Button, Input, Form, Modal } from "antd";
import { User } from "../types/User";

const CreateUser: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm(); // Ant Design form instance

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  const handleSubmit = (values: { firstName: string; lastName: string; email: string; avatar: string }) => {
    const newUser: User = {
      id: Date.now(),
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      avatar: values.avatar,
    };

    dispatch(createUser(newUser));
    setIsVisible(false);
    form.resetFields(); // Reset form after successful submission
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
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()} // Trigger form submission
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit} // Triggered only when the form is valid
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter your first name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar URL"
            name="avatar"
            rules={[{ required: true, message: "Please enter an avatar URL!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
