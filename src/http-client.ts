/**
 * Http Client for AppAsap
 *
 * GET /api/user?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D
 * @link: https://dev.to/nerdyman/replacing-query-string-with-native-urlsearchparams-4kdg
 * @author MarioMonir
 */

// -------------------------------------------------

import queryString from 'qs'

// -------------------------------------------------

export type HttpClientInput = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null | undefined | object;
  headers?: {};
  queryParams?: any;
};

export type HttpClientOutput = {
  res: Response;
  data: any;
  ok: boolean;
  status: number;
  total: number;
};

export type HttpClient = (input: HttpClientInput) => Promise<HttpClientOutput>;

// -------------------------------------------------

export const httpClient: HttpClient = async ({
  method = "GET",
  body = null,
  headers,
  url,
  queryParams = {},
}) => {
  try {
    const params = queryString.stringify(queryParams);

    url = `${url}?${params}`;

    headers = {
      "content-type": "application/json",
      ...headers,
    };

    if (body instanceof Object) {
      body = JSON.stringify(body);
    }

    const res = await fetch(url, { method, body, headers });

    const data = await res.json();

    const { ok, status } = res;

    let total: number = 10;

    let contentRangeHeader = res?.headers?.get("Content-Range");

    if (contentRangeHeader) {
      total = +contentRangeHeader?.split("/")[1] || 10;
    }

    return { res, ok, status, data, total };
  } catch (error) {
    console.error(error);

    throw error;
  }
};
