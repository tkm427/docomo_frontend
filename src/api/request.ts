import axios, { AxiosError } from "axios";
import {
  SessionResponse,
  EndSessionResponse,
  UserIdResponse,
  ZoomUrlResponse,
} from "../lib/type";

interface ApiError {
  error: string;
}
const BASE_URL =
  "https://7a72ialkw7.execute-api.ap-northeast-1.amazonaws.com/api/";

export const joinOrCreateSession = async (
  userId: string
): Promise<SessionResponse> => {
  try {
    const response = await axios.post<SessionResponse>(
      `${BASE_URL}/session`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            "An error occurred while joining/creating a session"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const endSession = async (
  sessionId: string
): Promise<EndSessionResponse> => {
  try {
    const response = await axios.get<EndSessionResponse>(
      `${BASE_URL}/end_session/${sessionId}/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            "An error occurred while ending the session"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<UserIdResponse> => {
  try {
    const response = await axios.post<UserIdResponse>(
      `${BASE_URL}/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            "An error occurred while registering the user"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<UserIdResponse> => {
  try {
    const response = await axios.post<UserIdResponse>(
      `${BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            "An error occurred while logging in the user"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getZoomUrl = async (
  sessionId: string
): Promise<ZoomUrlResponse> => {
  try {
    const response = await axios.get<ZoomUrlResponse>(
      `${BASE_URL}/get_zoom_url/${sessionId}/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.error ||
            "An error occurred while getting the Zoom URL"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
};
