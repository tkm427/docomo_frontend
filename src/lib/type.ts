export interface SessionResponse {
  sessionId: string;
  userCount: number;
  message: string;
  theme?: string;
}

export interface EndSessionResponse {
  message: string;
}
