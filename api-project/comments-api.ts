import { createServer, IncomingMessage, ServerResponse } from 'http';
import {IComment} from "./types";
import {readFile} from "fs/promises";


const loadComments = async(): Promise<IComment[]> => {
    const rawData = await readFile("mock-comments.json", "binary");
    return JSON.parse(rawData.toString());
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/comments' && req.method === 'GET') {
        const comments = await loadComments();
    
    
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(comments));
        res.end();
    } else if (req.url === '/api/comments' && req.method === 'POST') {
        let rawBody = '';
        req.on('data', (chunk) => {
            rawBody += chunk.toString();
        }); 
        console.log("rb=", rawBody);
    
        req.on('end', () => {
            console.log(JSON.parse(rawBody || null));
            res.end("OK")
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    } 
});

const PORT = 3000;
const addressIP = '127.0.0.1';
server.listen(PORT, addressIP, ()=>{
    console.log(`Server runnibg on port ${PORT}`);
});
