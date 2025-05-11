import { test, expect } from "../../fixtures/testSetup";
const fs = require("fs");
const path = require("path");
const API_KEY = process.env.API_KEY;

const zipCodeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "..", "data", "zipCodes.json"), "utf-8")
);

test("TC001: Should retrieve weather data for London and validate schema", async ({
  apiContext,
  requestUtils,
  responseUtils,
  geocodingSchema,
  endPoints,
}) => {
  const cityName = "London";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_CITY, {
    cityName,
    API_KEY,
  });
  const responseBody = await responseUtils.validateResponse(response, 200);

  // Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, geocodingSchema);

  // Additional specific validations
  expect(responseBody.name).toBe("London");
  expect(responseBody.sys.country).toBe("GB");
  expect(responseBody.main.temp).toBeGreaterThan(0); // Assuming temperature is in Kelvin
});

test("TC002: Should retrieve weather data for Madrid and validate temperature", async ({
  apiContext,
  requestUtils,
  responseUtils,
  geocodingSchema,
  endPoints,
}) => {
  const cityName = "Madrid";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_CITY, {
    cityName,
    API_KEY,
  });
  const responseBody = await responseUtils.validateResponse(response, 200);

  // Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, geocodingSchema);

  // Additional specific validations
  expect(responseBody.name).toBe("Madrid");
  expect(responseBody.main.temp).toBeGreaterThan(0); // Assuming temperature is in Kelvin
});

test("TC003: Should handle invalid apiKey and return 401", async ({
  apiContext,
  requestUtils,
  responseUtils,
  error401Schema,
  endPoints,
}) => {
  const cityName = "London";
  const invalidApiKey = "invalid_api_key";
  const invalidApiKeyMessage =
    "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_CITY, {
    cityName,
    invalidApiKey,
  });
  const responseBody = await responseUtils.validateErrorResponse(response, 401);

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, error401Schema);

  expect(responseBody.message).toBe(invalidApiKeyMessage);
});

test("TC004: Should handle non-existent city and return 404", async ({
  apiContext,
  requestUtils,
  responseUtils,
  error404Schema,
  endPoints,
}) => {
  const cityName = "NonExistentCity";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_CITY, {
    cityName,
    API_KEY,
  });

  // Validate that response status is 400 and get response body
  const responseBody = await responseUtils.validateNotFoundResponse(response);

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, error404Schema);
});

test("TC005: Should handle empty city and return 400", async ({
  apiContext,
  requestUtils,
  responseUtils,
  error400Schema,
  endPoints,
}) => {
  const cityName = "";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_CITY, {
    cityName,
    API_KEY,
  });

  // Validate that response status is 400 and get response body
  const responseBody = await responseUtils.validateBadRequestResponse(
    response,
    "Nothing to geocode"
  );

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, error400Schema);
});

test.describe("OpenWeatherMap Geocoding API Tests from Zip Codes", () => {
  for (const location of zipCodeData) {
    test(`TC006: Should retrieve weather data for valid Zip Code: ${location.zipCode} and validate schema`, async ({
      apiContext,
      requestUtils,
      responseUtils,
      geocodingSchema,
      endPoints,
    }) => {
      const { zipCode, cityName, country } = location;

      const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_ZIP, {
        zipCode: `${zipCode},${country}`,
        API_KEY,
      });

      const responseBody = await responseUtils.validateResponse(response, 200);

      await responseUtils.validateResponseBodySchema(responseBody, geocodingSchema);

      // Validaciones adicionales
      expect(responseBody.name).toBe(cityName);
      expect(responseBody.sys.country).toBe(country);
      expect(responseBody.main.temp).toBeGreaterThan(0); // Temperatura en Kelvin
    });
  }
});

test("TC007: Should handle empty zip code and return 400", async ({
  apiContext,
  requestUtils,
  responseUtils,
  error400Schema,
  endPoints,
}) => {
  const zipCode = "6";

  const response = await requestUtils.getRequest(apiContext, endPoints.GEOCODING_ZIP, {
    zipCode,
    API_KEY,
  });

  // Validate that response status is 400 and get response body
  const responseBody = await responseUtils.validateBadRequestResponse(
    response,
    "invalid zip code"
  );

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, error400Schema);
});
