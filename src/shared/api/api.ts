import axios from 'axios';
import { baseUrl } from '../config/constants';

type IUserFields = {
  email: string;
  password: string;
}

type ILoginUserRespose = {
  accessToken: string;
}

type ICheckMailSuccess = {
  email: string;
  message: string;
}

type IConfirmMail = {
  email: string;
  code: string;
}

type IErrorObject = {
  statusCode: number;
  error: string;
  message: string;
}

type Error = {
  error: IErrorObject
}

type IChangePassword = {
  password: string;
  confirmPassword: string;
}

export const registerUser = async (data: IUserFields): Promise<Error | `{}`> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/registration`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data as Error;
      }
      throw new Error('Axios error without response');
    }
    throw new Error('Non-Axios error');
  }
};

export const loginUser = async (body: IUserFields): Promise<ILoginUserRespose | Error> => {
  try {
    const response = await axios.post<ILoginUserRespose>(`${baseUrl}/auth/login`, body);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data as Error;
      }
      throw new Error('Axios error without response');
    }
    throw new Error('Non-Axios error');
  }
};

export const checkEMail = async (data: Omit<IUserFields, 'password'>): Promise<ICheckMailSuccess | Error> => {
  try {
    const response = await axios.post<ICheckMailSuccess>(`${baseUrl}/auth/check-email`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data as Error;
      }
      throw new Error('Axios error without response');
    }
    throw new Error('Non-Axios error');
  }
};

export const confirmEMailAPI = async (data: IConfirmMail): Promise<Omit<ICheckMailSuccess, 'email'> | Error> => {
  try {
    const response = await axios.post<Omit<ICheckMailSuccess, 'email'>>(`${baseUrl}/auth/confirm-email`, data, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data as Error;
      }
      throw new Error('Axios error without response');
    }
    throw new Error('Non-Axios error');
  }
};

export const changePasswordAPI = async (password: IChangePassword): Promise<ICheckMailSuccess | Error> => {
  try {
    const response = await axios.post<ICheckMailSuccess>(`${baseUrl}/auth/change-password`, password, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data as Error;
      }
      throw new Error('Axios error without response');
    }
    throw new Error('Non-Axios error');
  }
};
