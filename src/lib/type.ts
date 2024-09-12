export interface SessionResponse {
  sessionId: string;
  userCount: number;
  message: string;
  theme?: string;
}

export interface EndSessionResponse {
  message: string;
}

export interface UserIdResponse {
  message: string;
  userId: string;
}

export interface ZoomUrlResponse {
  zoomUrl: string;
  theme: string;
  userId: string;
  userName: string;
}