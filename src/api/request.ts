import axios, { AxiosError } from "axios";
import { SessionResponse, EndSessionResponse } from "../lib/type";

interface ApiError {
  error: string;
}
const BASE_URL = "https://localhost:8001";

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
