import axios, {AxiosError, AxiosInstance } from 'axios';
import { retrieveToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { handleError } from './handle-error';

interface ErrorResponse {
  type: string;
  message: string;
}

const API_URL = 'https://14.design.htmlacademy.pro/six-cities';
const TOKEN_NAME = 'X-Token';
const TIMEOUT = 5000;

const errorStatusMap: { [key: number]: boolean } = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const isErrorStatus = (status: number): boolean => !!errorStatusMap[status];

export const initializeAPI = (): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });

  apiInstance.interceptors.request.use((config) => {
    const token = retrieveToken();

    if (token && config.headers) {
      config.headers[TOKEN_NAME] = token;
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      if (error.response && isErrorStatus(error.response.status)) {
        const { message } = error.response.data;
        handleError(message);
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};
