import axios from 'axios';
import { server } from '../App';

export const getUsername = async () => {};

export const authenticate = async (username) => {
  try {
    return await axios.post(`${server}/api/authenticate`, { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
};

export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`${server}/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: 'Password Not Matched' };
  }
};
export const registerUser = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`${server}/api/register`, credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post(`${server}/api/registerMail`, {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return msg;
  } catch (error) {
    throw { error };
  }
};

export const verifyPassword = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post(`${server}/api/login`, {
        username,
        password,
      });
      return { data };
    } else {
      throw { error: 'No username provided.' };
    }
  } catch (error) {
    throw { error: "Password doesn't match...!" };
  }
};

export const updateUser = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`${server}/api/updateuser`, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    throw new Error('Invalid Information');
  }
};

export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`${server}/api/generateOTP`, { params: { username } });
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code} Enter this OTP to required field to recover your password`;
      await axios.post(`${server}/api/registerMail`, {
        username,
        userMail: email,
        text,
        subject: 'Password Recovery',
      });
    }
    return { code };
  } catch (error) {
    return new Error('Invalid Credientials');
  }
};
export const verifyOTP = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get(`${server}/api/verifyOTP`, {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return new Error('Invalid OTP');
  }
};
export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put(`${server}/api/resetPassword`, {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    throw { error };
  }
};
