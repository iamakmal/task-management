export interface TaskPayload {
  title: string;
  description: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: "INCOMPLETE" | "COMPLETE";
  createdAt: string;
}
