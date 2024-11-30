export interface IComment{
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
}

export type CommentCreatePayload = Omit<IComment, "id">;