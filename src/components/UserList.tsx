import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, removeUser } from '../redux/actions/userActions';
import { Table, Button, Avatar, Card, Row, Col, Input } from 'antd';
import { RootState } from '../redux/reducers/rootReducer';
import EditUser from './EditUser';
import UserHeader from './Header';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { User } from '../types/User';
import CreateUser from './CreateUser';


const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(removeUser(id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (_: any, record: User) => <Avatar src={record.avatar} size="large" />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <div>
          <EditUser user={record} />
          <Button onClick={() => handleDelete(record.id)} className="delete-btn">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <UserHeader />

      <div className="header-actions">
        <div className="left-actions">
          <Input
            placeholder="Search User"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            prefix={<SearchOutlined />}
          />
           <CreateUser />
        </div>
        <div className="view-toggle">
          <Button
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'active' : ''}
          >
            Table
          </Button>
          <Button
            onClick={() => setViewMode('card')}
            className={viewMode === 'card' ? 'active' : ''}
          >
            Card
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            rowKey="id"
            scroll={{ x: 'max-content' }} // Add horizontal scroll
            className="custom-table"
          />
        </div>
      ) : (
        <Row gutter={[16, 16]} className="card-container">
          {filteredUsers.map((user: any) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <Card
                hoverable
                className="user-card"
                cover={
                  <div className="avatar-container">
                    <Avatar
                      src={user.avatar}
                      size={80}
                      className="user-avatar"
                    />
                  </div>
                }
              >
                <div className="card-content">
                  <h3>{user.first_name}</h3>
                  <p>{user.email}</p>
                </div>
                <div className="card-actions">
                  <Button
                    icon={<EditOutlined />}
                    shape="circle"
                    className="edit-btn"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    shape="circle"
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserList;
