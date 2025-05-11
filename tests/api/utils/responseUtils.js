import { expect } from "@playwright/test";
import { validateResponseSchema } from "./schemaValidator"; // Importar la función

class ResponseUtils {
  /**
   * Logs the entire response for debugging purposes.
   * @param response - The API response object to be logged.
   */
  async logResponse(response) {
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${await response.text()}`);
  }

  /**
   * Validates the response for a successful request by checking status code and content type.
   * Logs the response and returns the JSON-parsed body for further validation.
   * @param response - The API response object to validate.
   * @param expectedStatusCode - The expected HTTP status code.
   * @returns The JSON-parsed response body.
   */
  async validateResponse(response, expectedStatusCode) {
    this.logResponse(response);
    expect(response.status()).toBe(expectedStatusCode);

    // Check if the content-type contains 'application/json'
    const contentType = await response.headers()["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Empty response body Error"); // Log the message if content-type is not 'application/json'
    }

    expect(contentType).toContain("application/json"); // Continue with the assertion

    return await response.json(); // Simplified return of parsed JSON
  }

  /**
   * Validates that the response is a Bad Request (400) and logs the error message.
   * @param response - The API response object.
   * @param expectedMessage - The expected message returned.
   * @returns The JSON-parsed response body.
   */
  async validateBadRequestResponse(response, expectedMessage) {
    const responseBody = await this.validateResponse(response, 400);
    expect(responseBody.message).toContain(expectedMessage);
    console.error(`Bad Request: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is a Not Found (404) and logs the error message.
   * @param response - The API response object.
   * @returns The JSON-parsed response body.
   */
  async validateNotFoundResponse(response) {
    const responseBody = await this.validateResponse(response, 404);
    expect(responseBody.message).toContain("not found");
    console.error(`Not Found: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is Internal Server Error(500) and logs the error message.
   * @param response - The API response object.
   * @returns The JSON-parsed response body.
   */
  async validateInternalServerErrorResponse(response) {
    const responseBody = await this.validateResponse(response, 500);
    expect(responseBody.error).toContain("Server Error");
    console.error(`Server Error: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is Internal Server Error(500) and logs the error message.
   * @param response - The API response object.
   * @returns The JSON-parsed response body.
   */
  async validateMethodNotAllowedResponse(response) {
    const responseBody = await this.validateResponse(response, 405);
    expect(responseBody.error).toContain("Method Not Allowed");
    console.error(`Method Not Allowed: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Generic function to validate any error response by status code.
   * Logs the error message and returns the parsed response body.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code for the error.
   * @returns The JSON-parsed response body.
   */
  async validateErrorResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, expectedStatusCode);
    console.error(`Error Response: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response body contains a validation error for a missing field.
   * @param responseBody - The parsed response body containing errors.
   * @param field - The name of the missing field.
   */
  async validateMissingFieldError(responseBody, field) {
    const errors = responseBody.errors;
    const fieldError = errors.find((error) => error.field === field);
    expect(fieldError).toBeDefined(); // Assert that the error for the field exists
    expect(fieldError.defaultMessage).toBe("must not be empty"); // Assert the specific error message
  }

  /**
   * Validates the response body against the expected schema.
   * @param responseBody - The parsed response body.
   * @param expectedSchema - The schema to validate the response body against.
   */
  async validateResponseBodySchema(responseBody, expectedSchema) {
    const isValid = validateResponseSchema(responseBody, expectedSchema);
    expect(isValid).toBeTruthy();
  }
}

export default ResponseUtils;
