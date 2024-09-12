export interface SessionResponse {
  sessionId: string;
  userCount: number;
  message: string;
  theme?: string;
}

export interface MessageResponse {
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

interface FeedbackItem {
  id: string;
  user_id: string;
  session_id: string;
  leadership: number;
  proactivity: number;
  expression: number;
  logicality: number;
  consideration: number;
  cooperation: number;
  comment: string;
}

export interface FeedbackResponse {
  [date: string]: FeedbackItem[];
}