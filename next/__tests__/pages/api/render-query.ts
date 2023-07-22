import handler from '../../../pages/api/render-query';
import { NextApiRequest, NextApiResponse } from 'next';

describe('handler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      body: {
        natural_language_query: 'Show me all customers in California',
      },
    } as NextApiRequest;

    res = {
      json: jest.fn() as jest.Mock,
    } as unknown as jest.Mocked<NextApiResponse>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return an error if natural language query is not found', async () => {
    req.body.natural_language_query = undefined;

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: 'Natural language query not found' });
  });

  it('should return a response if natural language query is found', async () => {
    await handler(req, res);

    expect(res.json).toHaveBeenCalled();
    // expect(res.json.mock).toHaveBeenCalledWith({})
    // expect(res.json.mock.calls[0][0].data).toBeDefined();
  });

  it('should return an error if there was an error rendering the SQL', async () => {
    const error = new Error('Request failed with status code 401');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(res, 'json').mockImplementation(() => {});

    // jest.spyOn(handler, 'createChatCompletion').mockRejectedValue(error);

    await handler(req, res);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.json).toHaveBeenCalledWith({ data: 'There was an error rendering the SQL :(', error: error });
  });
});