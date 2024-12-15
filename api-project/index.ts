import { initDataBase } from "./db";

async function runServer() {
    const connection = await initDataBase();
}

runServer();