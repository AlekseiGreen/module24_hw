import { initDataBase } from "./db";


async function runServer() {
    const connection = await initDataBase();
    const [rows] = await connection.execute<[any]>("SELECT * FROM products");
    console.log(rows.length);
    console.log(rows[0]);
}

runServer();