import axios from 'axios';
import { BASE_URL } from '../constants/api';

const handleResponse = async (response) => {
  if (response.status === 200 && response.data) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    return Promise.reject(error);
  }
  return Promise.reject(new Error('Network response was not ok.'));
};

const handleError = (error) => Promise.reject(error);

const API = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

export const getAPIData = async (url) => {
  try {
    const response = await API.get(url);
    return handleResponse(response);
  } catch (e) {
    return handleError(`Axios request failed: ${e}`);
  }
};
