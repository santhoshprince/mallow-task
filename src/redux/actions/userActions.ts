import axios from 'axios';
import { Dispatch } from 'redux';
import { setUsers, addUser, updateUser, deleteUser, setLoading, setError } from '../reducers/userReducer';
import { User } from '../../types/User';

const apiUrl = 'https://reqres.in/api/users';

export const fetchUsers:any = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${apiUrl}?page=1`);
    dispatch(setUsers(response.data.data));
  } catch (error) {
    dispatch(setError('Failed to fetch users'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createUser:any = (user: User) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(apiUrl, user);
    dispatch(addUser(response.data));
  } catch (error) {
    dispatch(setError('Failed to create user'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserDetails:any = (user: User) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.put(`${apiUrl}/${user.id}`, user);
    dispatch(updateUser(response.data));
  } catch (error) {
    dispatch(setError('Failed to update user'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeUser:any = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`${apiUrl}/${id}`);
    dispatch(deleteUser(id));
  } catch (error) {
    dispatch(setError('Failed to delete user'));
  } finally {
    dispatch(setLoading(false));
  }
};
