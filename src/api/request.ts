import axios, { AxiosError } from "axios";
import {
  SessionResponse,
  MessageResponse,
  UserIdResponse,
  ZoomUrlResponse,
  FeedbackResponse,
} from "../lib/type";

interface ApiError {
  error: string;
}

// ユーザーへのフィードバックデータの型
type UserFeedback = {
  id: string;
  proactivity: number;
  logicality: number;
  leadership: number;
  cooperation: number;
  expression: number;
  consideration: number;
  comment: string;
};

// 全体のフィードバックデータの型
type FeedbackData = {
  sessionId: string; // セッションID
  senderId: string;  // フィードバックを送る自分のユーザーID
  users: Record<string, UserFeedback>; // ユーザーIDをキーとするフィードバックのオブジェクト
};

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
): Promise<MessageResponse> => {
  try {
    const response = await axios.get<MessageResponse>(
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

export const getFeedback = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_feedbacks/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const feedback = async(feedbackData: FeedbackData): Promise<MessageResponse> => {
  try {
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/feedback`,
      feedbackData,
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
            "An error occurred while sending feedback"
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
}
