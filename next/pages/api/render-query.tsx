import type { NextApiRequest, NextApiResponse } from 'next'

const { Configuration, OpenAIApi } = require("openai");

type ResponseData = {
    data: string
}
const prompt = `### MySQL tables, with their properties:
# 
# customers(CustomerID, FirstName, LastName, Email, Address, City, State, ZipCode, Phone)
# accounts(AccountNumber, CustomerID, AccountType, Balance)
# transactions(TransactionID, AccountNumber, TransactionType, Amount, Date)
#
###`


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
        response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: prompt + body.natural_language_query + "\n SELECT",
            temperature: 0,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["#", ";"],
        });
        return res.json({ data: 'SELECT ' + response?.data?.choices[0]?.text });
    } catch (error) {
        console.error(error);
        return res.json({ data: 'There was an error rendering the SQL :(' });
        throw error;
    }
}