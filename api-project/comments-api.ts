import { createServer, IncomingMessage, ServerResponse } from 'http';
import {IComment} from "./types";
import {readFile} from "fs/promises";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if(req.url === '/api/comments' && req.method === 'GET'){
        res.setHeader('Content-Type', 'application/json');
        res.write('abc');
        res.end();
    }else{
        res.statusCode = 400;
        res.end('Not found :( ');
    }
});

const PORT = 3000;
const addressIP = '127.0.0.1';
server.listen(PORT, addressIP, ()=>{
    console.log(`Server runnibg on port ${PORT}`);
});
