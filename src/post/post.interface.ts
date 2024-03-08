export interface CreatePostParams {
  userId: number;
  content: string;
  media?: string[];
}

export interface UpdatePostParams {
  content: string;
}
