class RequestUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  // Default headers used in all requests
  headers = { "Content-Type": "application/json" };

  /**
   * Build URL method to handle base URL, path params, and query params.
   * Replaces any placeholders in the endpoint URL with the actual values from pathParams.
   * @param endpoint - The API endpoint with optional placeholders for path parameters (e.g., /owners/{ownerId}).
   * @param pathParams - The path parameters that will replace placeholders in the endpoint (e.g., { ownerId: '1' }).
   * @returns The fully resolved URL with path parameters replaced.
   */
  async buildURL(endpoint, pathParams = {}) {
    let resolvedEndpoint = endpoint;
    for (const [key, value] of Object.entries(pathParams)) {
      resolvedEndpoint = resolvedEndpoint.replace(`{${key}}`, value); // Replace path params with actual values
    }
    return resolvedEndpoint; // Directly return the resolved endpoint
  }

  /**
   * Makes a GET request to the specified API endpoint with optional path and query parameters.
   * @param apiContext - The Playwright API context used to make the request.
   * @param endpoint - The API endpoint to which the GET request is sent.
   * @param pathParams - Optional path parameters to be replaced in the endpoint URL.
   * @returns The API response object from the GET request.
   */
  async getRequest(apiContext, endpoint, pathParams = {}) {
    const resolvedEndpoint = await this.buildURL(endpoint, pathParams); // Using resolvePathParams here
    this.logRequest("GET", resolvedEndpoint, this.headers); // Log the request details
    const response = await apiContext.get(resolvedEndpoint, {
      headers: this.headers,
    });
    return response;
  }

  /**
   * Makes a POST request to the specified API endpoint with a request body and optional path parameters.
   * @param apiContext - The Playwright API context used to make the request.
   * @param endpoint - The API endpoint to which the POST request is sent.
   * @param requestBody - The JSON body of the POST request.
   * @param pathParams - Optional path parameters to be replaced in the endpoint URL.
   * @returns The API response object from the POST request.
   */
  async postRequest(apiContext, endpoint, requestBody, pathParams = {}) {
    const resolvedEndpoint = await this.buildURL(endpoint, pathParams); // Resolve path parameters in the endpoint URL
    this.logRequest("POST", resolvedEndpoint, this.headers, requestBody); // Log the request details, including the request body
    const response = await apiContext.post(resolvedEndpoint, {
      headers: this.headers,
      data: requestBody, // Send the request body in the POST request
    });
    return response;
  }

  /**
   * Makes a PUT request to the specified API endpoint with a request body and optional path parameters.
   * @param apiContext - The Playwright API context used to make the request.
   * @param endpoint - The API endpoint to which the PUT request is sent.
   * @param requestBody - The JSON body of the PUT request.
   * @param pathParams - Optional path parameters to be replaced in the endpoint URL.
   * @returns The API response object from the PUT request.
   */
  async putRequest(apiContext, endpoint, requestBody, pathParams = {}) {
    const resolvedEndpoint = await this.buildURL(endpoint, pathParams); // Resolve path parameters in the endpoint URL
    this.logRequest("PUT", resolvedEndpoint, this.headers, requestBody); // Log the request details, including the request body
    const response = await apiContext.put(resolvedEndpoint, {
      headers: this.headers,
      data: requestBody, // Send the request body in the PUT request
    });
    return response;
  }

  /**
   * Makes a DELETE request to the specified API endpoint with optional path parameters.
   * @param apiContext - The Playwright API context used to make the request.
   * @param endpoint - The API endpoint to which the DELETE request is sent.
   * @param pathParams - Optional path parameters to be replaced in the endpoint URL.
   * @returns The API response object from the DELETE request.
   */
  async deleteRequest(apiContext, endpoint, pathParams = {}) {
    const resolvedEndpoint = await this.buildURL(endpoint, pathParams); // Resolve path parameters in the endpoint URL
    this.logRequest("DELETE", resolvedEndpoint, this.headers); // Log the request details
    const response = await apiContext.delete(resolvedEndpoint, {
      headers: this.headers,
    });
    return response;
  }

  /**
   * Logs the details of the request, including method, URL, headers, and optionally the request body.
   * @param method - The HTTP method (e.g., GET, POST, PUT, DELETE).
   * @param url - The full URL to which the request is being sent.
   * @param headers - The request headers.
   * @param body - (Optional) The request body (only applicable for POST and PUT requests).
   */
  async logRequest(method, url, headers, body) {
    console.log(`${method} Request URL: ${url}`);
    console.log(`Request Headers: ${JSON.stringify(headers)}`);
    if (body) {
      console.log(`Request Body: ${JSON.stringify(body, null, 2)}`);
    }
  }
}

export default RequestUtils;
