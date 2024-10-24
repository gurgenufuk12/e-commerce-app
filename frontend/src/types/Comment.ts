export interface Comment {
  commentAuthor: {
    userId: string | undefined;
    userName: string | undefined;
  };
  commentId: string;
  commentBody: string;
  commentDate: string;
}
