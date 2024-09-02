import query from '../query';

describe('query', () => {
  let response: any;
  let fetch: jest.Mock;

  beforeEach(() => {
    response = {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json',
        get: (v: string) => response.headers[v],
      },
      text: jest.fn().mockResolvedValue(JSON.stringify({ key: 'value' })),
    };
    fetch = jest.fn().mockResolvedValue(response);
  });

  describe('url', () => {
    it('sends a request to the given url', async () => {
      await query({ url: 'https://example.com', fetch });

      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/',
        expect.any(Object)
      );
    });
    describe('when url is relative', () => {
      it('prepends the current origin to the url', async () => {
        await query({ url: '/relative', fetch });

        expect(fetch).toHaveBeenCalledWith(
          'http://localhost/relative',
          expect.any(Object)
        );
      });
    });

    describe('when given an array of urls', () => {
      it('sends a request to the first url', async () => {
        await query({
          url: [
            'https://example.com',
            'https://example2.com',
            'https://example3.com',
          ],
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith(
          'https://example.com/',
          expect.any(Object)
        );

        expect(fetch).not.toHaveBeenCalledWith(
          'https://example2.com/',
          expect.any(Object)
        );

        expect(fetch).not.toHaveBeenCalledWith(
          'https://example3.com/',
          expect.any(Object)
        );
      });
      describe('when the first url fails', () => {
        beforeEach(() => {
          fetch.mockRejectedValueOnce(new Error('Network error'));
        });

        it('sends a request to the second url', async () => {
          await query({
            url: [
              'https://example.com',
              'https://example2.com',
              'https://example3.com',
            ],
            fetch,
          });

          expect(fetch).toHaveBeenCalledWith(
            'https://example.com/',
            expect.any(Object)
          );

          expect(fetch).toHaveBeenCalledWith(
            'https://example2.com/',
            expect.any(Object)
          );

          expect(fetch).not.toHaveBeenCalledWith(
            'https://example3.com/',
            expect.any(Object)
          );
        });
      });
    });
  });

  describe('query', () => {
    describe('when given a query object', () => {
      it('sends the query as search params', async () => {
        await query({
          url: 'https://example.com',
          query: { key: 'value' },
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith(
          'https://example.com/?key=value',
          expect.any(Object)
        );
      });

      it('gets the query params from data if provided instead', async () => {
        await query({
          url: 'https://example.com',
          data: { key: 'value' },
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith(
          'https://example.com/?key=value',
          expect.any(Object)
        );
      });
    });
    describe('when given a query string', () => {
      it('sends the query as search params', async () => {
        await query({
          url: 'https://example.com',
          query: 'key=value',
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith(
          'https://example.com/?key=value',
          expect.any(Object)
        );
      });
      describe('when the query string starts with a question mark', () => {
        it('sends the query as search params without adding an additional question mark', async () => {
          await query({
            url: 'https://example.com',
            query: '?key=value',
            fetch,
          });

          expect(fetch).toHaveBeenCalledWith(
            'https://example.com/?key=value',
            expect.any(Object)
          );
        });
      });
    });
  });

  describe('data', () => {
    describe('when given a FormData object', () => {
      it('sends the FormData object as the body', async () => {
        const formData = new FormData();
        formData.append('key', 'value');

        await query({
          method: 'POST',
          url: 'https://example.com',
          data: formData,
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: formData,
          headers: expect.any(Object),
          method: 'POST',
        });
      });
      it('does not set the Content-Type header', async () => {
        const formData = new FormData();
        formData.append('key', 'value');

        await query({
          method: 'POST',
          url: 'https://example.com',
          data: formData,
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: formData,
          headers: {},
          method: 'POST',
        });
      });
    });
    describe('when given a string', () => {
      it('sends the string as the body', async () => {
        await query({
          method: 'POST',
          url: 'https://example.com',
          data: '{"key":"value"}',
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: '{"key":"value"}',
          headers: expect.any(Object),
          method: 'POST',
        });
      });
      it('does not set the Content-Type header', async () => {
        await query({
          method: 'POST',
          url: 'https://example.com',
          data: '{"key":"value"}',
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: '{"key":"value"}',
          headers: {},
          method: 'POST',
        });
      });
    });
    describe('when given an object', () => {
      it('sends the object as the body', async () => {
        await query({
          method: 'POST',
          url: 'https://example.com',
          data: { key: 'value' },
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: '{"key":"value"}',
          headers: expect.any(Object),
          method: 'POST',
        });
      });
      it('sets the Content-Type header to application/json', async () => {
        await query({
          method: 'POST',
          url: 'https://example.com',
          data: { key: 'value' },
          fetch,
        });

        expect(fetch).toHaveBeenCalledWith('https://example.com/', {
          body: expect.any(String),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      });
      describe('when Content-Type header is already set', () => {
        it('does not override the Content-Type header with application/json', async () => {
          await query({
            method: 'POST',
            url: 'https://example.com',
            data: { key: 'value' },
            headers: {
              'Content-Type': 'text/plain',
            },
            fetch,
          });

          expect(fetch).toHaveBeenCalledWith('https://example.com/', {
            body: expect.any(String),
            headers: {
              'Content-Type': 'text/plain',
            },
            method: 'POST',
          });
        });
      });
    });
  });

  it('accepts both POST data as well as query params together', async () => {
    await query({
      method: 'POST',
      url: 'https://example.com',
      query: { key: 'value' },
      data: { key2: 'value2' },
      fetch,
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/?key=value',
      expect.objectContaining({
        body: '{"key2":"value2"}',
      })
    );
  });

  describe('response', () => {
    describe('when request is successful', () => {
      it('returns the parsed response body', async () => {
        const result = await query({ url: 'https://example.com', fetch });

        expect(result).toEqual({ key: 'value' });
      });
      describe('when response is not JSON', () => {
        beforeEach(() => {
          response.headers['content-type'] = 'text/plain';
          response.text.mockResolvedValue('Hello, world!');
        });

        it('returns the response body as a string', async () => {
          const result = await query({ url: 'https://example.com', fetch });

          expect(result).toEqual('Hello, world!');
        });
      });
    });

    describe('when request fails', () => {
      beforeEach(() => {
        response.ok = false;
        response.status = 500;
        response.text.mockResolvedValue(
          JSON.stringify({ error: 'Server error' })
        );
      });

      it('retries the request up to the maxAttempts number of times', async () => {
        try {
          await query({ url: 'https://example.com', fetch, maxAttempts: 3 });
        } catch {
          // ignore
        } finally {
          expect(fetch).toHaveBeenCalledTimes(3);
        }
      });
      it('throws an error', async () => {
        await expect(
          query({ url: 'https://example.com', fetch })
        ).rejects.toEqual(expect.any(Error));
      });
    });
  });
});
