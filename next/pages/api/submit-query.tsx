import Connection from 'mysql2/typings/mysql/lib/Connection';
import type { NextApiRequest, NextApiResponse } from 'next'
const { createConnection } = require('mysql2/promise');

type ResponseData = {
    data: Array<Object>
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    let body = req.body

    if (!body.sql_query.data) {
        return res.json({ data: [] })
    }

    console.log(`Submitting SQL query to DB: ${body.sql_query.data}`);

    let response, connection;
    try {
        connection = await createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        await connection.connect();
        response = await connection.query(body.sql_query.data);      
        connection.end();
        return res.json({ data: response[0] });
    } catch (error) {        
        console.error(error);
        if(connection) try { connection.end(); } 
        catch (error) { /* ignore error for now */ }

        return res.json({ data: [] });
    }
}