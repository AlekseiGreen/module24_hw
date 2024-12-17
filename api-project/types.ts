import { RowDataPacket } from "mysql2/index";

export interface ICommentEntity extends RowDataPacket {
    comment_id: string;
    name: string;
    email: string;
    body: string;
    product_Id: string;
}


export interface IComment{
    id: string;
    name: string;
    email: string;
    body: string;
    postId: number;
}

export type CommentCreatePayload = Omit<IComment, "id">;