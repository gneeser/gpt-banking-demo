import type { NextApiRequest, NextApiResponse } from 'next'

const { Configuration, OpenAIApi } = require("openai");

type ResponseData = {
    data: string,
    error?: any
}

const system_content = `
Given the following SQL tables, your job is to write queries given a user's request.

CREATE TABLE IF NOT EXISTS customers (
  CustomerID INTEGER PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  State CHAR(2) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  Phone VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  AccountNumber INTEGER PRIMARY KEY,
  CustomerID INTEGER NOT NULL,
  AccountType VARCHAR(255) NOT NULL,
  Balance DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID)
);

CREATE TABLE IF NOT EXISTS transactions (
  TransactionID INTEGER PRIMARY KEY,
  AccountNumber INTEGER NOT NULL,
  TransactionType VARCHAR(255) NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  Date DATE NOT NULL,
  FOREIGN KEY (AccountNumber) REFERENCES accounts(AccountNumber)
);`


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    let body = req.body

    if (!body.natural_language_query) {
        return res.json({ data: 'Natural language query not found' })
    }
    console.log(`Rendering natural language to SQL: "${body.natural_language_query}"`);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let response;
    try {
        response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: system_content
                },
                {
                    role: "user",
                    content: body.natural_language_query
                }
            ],
            temperature: 0,
            max_tokens: 1024
        });
        return res.json({ data: response?.data?.choices[0]?.message?.content });
    } catch (error) {
        // console.error(error);
        return res.json({ data: 'There was an error rendering the SQL :(', error: error });
        throw error;
    }
}