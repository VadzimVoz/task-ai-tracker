const allowedOrigins = [
  'http://localhost:3000',
  'https://mydomain.com',
 
];

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('Origin');
  return origin && allowedOrigins.includes(origin) ? origin : 'null';
}

export function withCORS(response: Response, request: Request): Response {
  const origin = getAllowedOrigin(request);

  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function corsOptionsResponse(request: Request): Response {
  const origin = getAllowedOrigin(request);

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
