import { test as base, expect } from "@playwright/test";
import RequestUtils from "../utils/requestUtils"; // Imports the utility class for making API requests
import ResponseUtils from "../utils/responseUtils"; // Imports the utility class for validating API responses
import { EndPoints } from "../utils/endpoints"; // Imports the object containing API endpoint definitions
import geocodingSchemaData from "../schemas/geocodingSchema.json"; // Imports the JSON schema for geocoding objects
import error_400_SchemaData from "../schemas/error_400_Schema.json"; // Imports the JSON schema for REST error responses
import error_401_SchemaData from "../schemas/error_401_Schema.json"; // Imports the JSON schema for REST error responses
import error_404_SchemaData from "../schemas/error_404_Schema.json"; // Imports the JSON schema for REST error responses

/*
  This file sets up shared test "fixtures" for API testing using Playwright.

  A fixture in Playwright is a reusable helper that gets injected into tests.
  Here, we define fixtures for:
    - Request and response utilities
    - API endpoints
    - JSON schemas for validating API response bodies

  Why this is useful:
  - It centralizes setup code, so test files stay clean and focused
  - It makes the API testing more consistent and easier to maintain
  - You can easily add new utilities or data sources without repeating code
*/

const baseFixture = base.extend({
  // Provides an isolated API request context for each test
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext();
    await use(apiContext);
    await apiContext.dispose();
  },

  // Provides an instance of RequestUtils for making API requests
  requestUtils: async ({ apiContext }, use) => {
    await use(new RequestUtils(apiContext));
    // Cleanup (if needed)
  },

  // Provides an instance of ResponseUtils for validating API responses
  responseUtils: async ({ apiContext }, use) => {
    await use(new ResponseUtils());
    // Cleanup (if needed)
  },

  // Provides the EndPoints object containing API endpoint definitions
  endPoints: async ({}, use) => {
    await use(EndPoints);
    // No cleanup needed
  },

  // Provides the geocoding schema for API response validation
  geocodingSchema: ({}, use) => {
    use(geocodingSchemaData);
  },

  // Provides the error schema for API error response validation
  error400Schema: ({}, use) => {
    use(error_400_SchemaData);
  },

  // Provides the error schema for API error response validation
  error401Schema: ({}, use) => {
    use(error_401_SchemaData);
  },

  // Provides the error schema for API error response validation
  error404Schema: ({}, use) => {
    use(error_404_SchemaData);
  },
});

export const test = baseFixture;
export { expect };
