export interface PostRes {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface AddPostReq {
  title: string;
  userId: number;
  body: string;
  tags: string[];
}
