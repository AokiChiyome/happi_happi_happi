export interface Bookmark {
  _id: string;
  userId: string;
  coupleKey?: string;
  type: "message" | "dish" | "post";
  targetId?: string;
  title: string;
  content: string;
  emoji: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookmarkData {
  type?: "message" | "dish" | "post";
  targetId?: string;
  title: string;
  content?: string;
  emoji?: string;
  metadata?: any;
}
