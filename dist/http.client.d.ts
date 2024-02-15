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