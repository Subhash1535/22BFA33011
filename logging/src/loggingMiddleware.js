// src/loggingMiddleware.js
export function logRequest(url, options = {}) {
  console.log("📤 API Request:", {
    url,
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body ? JSON.parse(options.body) : null,
  });
}

export function logResponse(response) {
  console.log("📥 API Response:", {
    url: response.url,
    status: response.status,
    ok: response.ok,
  });
}
