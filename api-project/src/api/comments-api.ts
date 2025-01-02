import { Request, Response, Router } from 'express';
import { CommentCreatePayload, IComment, ICommentEntity } from "../../types";
import { readFile, writeFile } from "fs/promises";
import { checkCommentUniq, validateComment } from "../helpers";
import { v4 as uuidv4 } from 'uuid';
import { connection } from "../../index";
import { mapCommentEntity } from '../services/mapping';
import { OkPacket } from "mysql2";
import { COMMENT_DUPLICATE_QUERY, INSERT_COMMENT_QUERY } from "../services/queries";


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

commentsRouter.post('/', async(
  req:Request < {}, {}, CommentCreatePayload >,
  res:Response ) => {
    const validationResult = validateComment(req.body);

    if (validationResult) {
      res.status(400);
      res.send(validationResult);
      return;
    }

    //const comments = await loadComments();
    //const isUniq = checkCommentUniq(req.body, comments);
  
    try{
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
    
      const id = uuidv4();
      const insertQuery = `
        INSERT INTO comments
        (comment_id, email, name, body, product_id)
        VALUES
        (?,?,?,?,?)
      `;
    
      const [info] = await connection.query<OkPacket>(insertQuery, [
        id,
        email,
        name,
        body,
        productId,
      ]);
    console.log(info);
     
     res.status(201);
     res.send(`Comment id:${id} has been added!`); 
    } catch(e) {
      console.log('e.message=', e.message);
      res.status(500);
      res.send("Server error. Comment has not been created");
    }  
}

);

commentsRouter.patch('/', async(
  req:Request < {}, {}, Partial<IComment> >,
  res:Response ) => {
    try{
      // block_1
      let updateQuery ="UPDATE comments SET ";
      const valuesToUpdate =[];
      ["name", "body", "email"].forEach(fieldName=>{
        if(req.body.hasOwnProperty(fieldName)) {
          if(valuesToUpdate.length) {
            updateQuery += ", ";
          }
          updateQuery += `${fieldName} = ?`;
          valuesToUpdate.push(req.body[fieldName]);
        }
      });
    
      updateQuery += " WHERE comment_id = ?";
      valuesToUpdate.push(req.body.id);

      console.log("req.body.id=", req.body.id);

      // Example-> updateQuery="UPDATE comments SET name = ?, email = ? WHERE comment_id = ?"
      const [info] = await connection.query<OkPacket>(updateQuery, valuesToUpdate);
      
      if (info.affectedRows === 1) {
        res.status(200);
        res.end();
        return;
      }// END block_1
    
      // block_2
      const newComment = req.body as CommentCreatePayload;
      const validationResult = validateComment(newComment);
    
      if (validationResult) {
        res.status(400);
        res.send(validationResult);
        return;
      }// END block_2
    
      // block_3
      const id = uuidv4();
      await connection.query<OkPacket>(
        INSERT_COMMENT_QUERY,
        [id, newComment.email, newComment.name, newComment.body, newComment.productId]
      );
    
      res.status(201);
      res.send({... newComment,});
      // END block_3
    } catch(e) {
      console.log(201);
      res.status(500);
      res.send("Server error");
    }
    
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
