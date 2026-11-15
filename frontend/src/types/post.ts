export interface Reaction {
  userId: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  type: "love" | "heart" | "yummy" | "sad" | "like";
  createdAt: string;
}

export interface Post {
  _id: string;
  coupleKey: string;
  authorId: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  partnerId: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  content: string;
  images: string[];
  foodDish?: {
    name: string;
    category: string;
    emoji: string;
  };
  feeling?: string;
  reactions: Reaction[];
  commentsCount: number;
  isStory?: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  postId: string;
  coupleKey: string;
  authorId: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
}
