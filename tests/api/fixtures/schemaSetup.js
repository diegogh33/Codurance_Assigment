import { test as baseTest } from "@playwright/test";
import geocodingSchema from "../schemas/geocodingSchema";
import error_400_Schema from "../schemas/error_400_Schema";
import error_401_Schema from "../schemas/error_401_Schema";
import error_404_Schema from "../schemas/error_404_Schema";

/*
  This file sets up reusable "fixtures" for API schema validation in tests.

  A fixture is a value or helper you can use inside your tests, like a shared object.
  Here, we are creating fixtures that provide access to JSON schemas for validating API responses.

  Why this is useful:
  - It helps ensure that the API returns the expected structure and data types.
  - It keeps the test files clean by moving schema loading to this setup file.
  - It avoids repeating the same import code in every test file.

  Once set up, you can access these schemas directly in your tests using:
    test("example", async ({ geocodingSchema }) => { ... })
*/

export const test = baseTest.extend({
  // Fixture for Geocoding Schema: Provides the Geocoding schema for API response validation.
  geocodingSchema: async ({}, use) => {
    await use(geocodingSchema);
  },
  // Fixture for Error Schema: Provides the error schema for API error response validation.
  error400Schema: async ({}, use) => {
    await use(error_400_Schema);
  },

  // Fixture for Error Schema: Provides the error schema for API error response validation.
  error401Schema: async ({}, use) => {
    await use(error_401_Schema);
  },

  // Fixture for Error Schema: Provides the error schema for API error response validation.
  error404Schema: async ({}, use) => {
    await use(error_404_Schema);
  },
});
