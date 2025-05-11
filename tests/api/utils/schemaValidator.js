import Ajv from "ajv"; // Imports the Ajv library for JSON schema validation
import addFormats from "ajv-formats"; // Imports the ajv-formats library to add predefined formats (e.g., email, date)

// Creates a single instance of the Ajv validator
const ajv = new Ajv();

// Initializes the predefined formats provided by ajv-formats for the global Ajv instance
addFormats(ajv);

/**
 * Validates a response body against a provided JSON schema.
 * @param {object} responseBody - The JSON body of the API response to validate.
 * @param {object} schema - The JSON schema to validate against.
 * @returns {boolean} - True if the response body is valid according to the schema, false otherwise.
 */
const validateResponseSchema = (responseBody, schema) => {
  // Compiles the provided schema using the global Ajv instance.
  // 'compile' returns a validation function.
  const validate = ajv.compile(schema);
  // Executes the validation function against the response body.
  const valid = validate(responseBody);
  // If the validation fails, logs the detailed errors to the console for debugging.
  if (!valid) console.log(validate.errors);
  // Returns the boolean result of the validation.
  return valid;
};

// Exports the 'validateResponseSchema' function so it can be imported and used in other modules.
export { validateResponseSchema };
