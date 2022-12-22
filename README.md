# gpt-banking-demo
A basic demo of using GPT3 to make a natural language to SQL app in Next.js.

To try it out for yourself, you'll need to start by [making an account](https://beta.openai.com/signup) with OpenAI and creating an [API Key](https://beta.openai.com/account/api-keys).

After you have your key, clone this repo, cd into it, and place your key in an `env.local` file (or just export it on your command line), e.g. 

```
export OPENAI_API_KEY=<key>
```

From there, as long as you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed, it's as simple as running `docker compose up`. Docker will create two containers for you - a MySQL DB, which will be populated according to the `init.sql` file, and the Next.js app itself, which will run at `localhost:3000`. 

Check the `init.sql` file for what tables and values you can expect to find, then test out a few "natural language" queries, e.g.

```
customers who have made a withdrawal in the last month
```

The application will send your request to be parsed by OpenAI via their sdk, display the resulting SQL, and then make the request against the local MySQL DB, returning the results as a plain HTML table.
