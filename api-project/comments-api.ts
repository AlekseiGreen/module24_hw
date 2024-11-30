import express, {Request, Response} from 'express';
import {CommentCreatePayload, IComment} from "./types";
import {readFile, writeFile} from "fs/promises";
import {v4 as uuidv4} from 'uuid';


const loadComments = async(): Promise<IComment[]> => {
    const rawData = await readFile("mock-comments.json", "binary");
    return JSON.parse(rawData.toString());
}

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

function validateComment(in_:any){
    return true;
}

const saveComments = async (data: IComment[]): Promise<void> => {
    await writeFile("mock-comments.json", JSON.stringify(data));
} 

const PATH = '/api/comments';

app.get(PATH, async (req: Request, res: Response) => {
    const comments = await loadComments();
    res.setHeader('Content-Type', 'application/json');
    res.send(comments);
});

app.post(PATH, async(req:Request<{}, {}, CommentCreatePayload>, res:Response)=>{
    console.log('req=', req.body);
    const validationResult = validateComment(req.body);

    if (0) {
        res.status(400);
        res.send(validationResult);
        return;
    }

    const id = uuidv4();
    console.log('id=', id);

    const comments = await loadComments();
    comments.push({ ...req.body, id });
    await saveComments(comments);
    
    res.status(201);
    res.send(`Comment id:${id} has been added!`);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});