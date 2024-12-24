import { Request, Response, Router } from 'express';
import { CommentCreatePayload, IComment, ICommentEntity } from "../../types";
import { readFile, writeFile } from "fs/promises";
import { checkCommentUniq, validateComment } from "../helpers";
import { v4 as uuidv4 } from 'uuid';
import { connection } from "../../index";
import { mapCommentEntity } from '../services/mapping';


const loadComments = async(): Promise<IComment[]> => {
    const rawData = await readFile("mock-comments.json", "binary");
    return JSON.parse(rawData.toString());
}

const saveComments = async (data: IComment[]): Promise<void> => {
    await writeFile("mock-comments.json", JSON.stringify(data));
}

export const commentsRouter = Router();

commentsRouter.get('/', async( req:Request, res:Response ) => {
  try {
    const [comments] = await connection.query<ICommentEntity[]>(
      "SELECT * FROM comments"
    );
    //console.log('Comments=', comments);
    res.setHeader('Content-Type', 'application/json');
    res.send(mapCommentEntity(comments));
  }catch(e) {
    console.debug(e.message);
    res.status(500);
    res.send("Something went wrong");
  }
  
});

commentsRouter.post('/', async( req:Request < {}, {}, CommentCreatePayload >, res:Response ) => {
    const validationResult = validateComment(req.body);

    if (validationResult) {
      res.status(400);
      res.send(validationResult);
      return;
    }

    //const comments = await loadComments();
    //const isUniq = checkCommentUniq(req.body, comments);
  
    const { name, email, body, productId } = req.body;
    const findDuplicateQuery = `
      SELECT * FROM comments c
      WHERE LOWER(c.email) = ?
      AND LOWER(c.name) = ?
      AND LOWER(c.body) = ?
      AND c.product_id = ?
    `;

    const [sameResult] = await connection.query<ICommentEntity[]>(
      findDuplicateQuery,
      [email.toLowerCase(), name.toLowerCase(), body.toLowerCase(), productId]
    );
    console.log('sameResult=', sameResult);
    console.log('sameResult[0].comment_id=', sameResult[0]?.comment_id);

    if(sameResult.length) {
      console.log('in=');
      res.status(422);
      res.send("Comment with the same fields already exists");
      return;
    }
  
    // if (!isUniq) {
    //   res.status(422);
    //   res.send("Comment with the same fields already exists");
    //   return;
    // }
  
    // const id = uuidv4();
    // comments.push({ ...req.body, id });
  
    // const saved = await saveComments(comments);
  
    // if (0) { //!saved
    //   res.status(500);
    //   res.send("Server error. Comment has not been created");
    //   return;
    // }
  
    // res.status(201);
    // res.send(`Comment id:${id} has been added!`);
});

commentsRouter.patch('/', async( req:Request < {}, {}, Partial<IComment> >, res:Response ) => {
    const comments = await loadComments();

    const targetCommentIndex = comments.findIndex(({ id }) => req.body.id === id);
  
    if (targetCommentIndex > -1) {
      comments[targetCommentIndex] = { ...comments[targetCommentIndex], ...req.body }
      await saveComments(comments);
  
      res.status(200);
      res.send(comments[targetCommentIndex]);
      return;
    }
  
    const newComment = req.body as CommentCreatePayload;
    const validationResult = validateComment(newComment);
  
    if (validationResult) {
      res.status(400);
      res.send(validationResult);
      return;
    }
  
    const id = uuidv4();
    const commentToCreate = { ...newComment, id };
    comments.push(commentToCreate);
    await saveComments(comments);
  
    res.status(201);
    res.send(commentToCreate);
});

commentsRouter.delete('/:id', async( req:Request < { id:string } >, res:Response ) => {
    const comments = await loadComments();
    const id = req.params.id;
  
    let removedComment: IComment | null = null;
  
    const filteredComments = comments.filter((comment) => {
      if (id === comment.id.toString()) {
        removedComment = comment;
        return false;
      }
  
      return true;
    });
  
    if (removedComment) {
      await saveComments(filteredComments);
      res.status(200);
      res.send(removedComment);
      return;
    }
  
    res.status(404);
    res.send(`Comment with id ${id} is not found`);
  });
