# API Testing Framework with Playwright

This project provides a set of tools and a framework for testing APIs using Playwright. It includes utilities for making requests, handling responses, validating schemas, and defining API endpoints.

## Project Structure

The project is organized as follows:

- **`endpoints.js`**: Defines the API endpoints used in the tests.
- **`requestUtils.js`**: Provides utility functions for making API requests (GET, POST, PUT, DELETE) with Playwright's `APIRequestContext`. It also includes functionality to build URLs with path parameters and log request details.
- **`responseUtils.js`**: Offers utility functions for validating API responses. This includes checking status codes, content types, validating response bodies against JSON schemas, and handling different types of error responses.
- **`schemaValidator.js`**: Implements JSON schema validation using the `ajv` library.
- **`tests/api/`**: Contains API tests.
  - `data/`: Stores test data (e.g., JSON files with sets of data for parameterized testing).
  - `specs/`: Contains the test specifications (Playwright test files).
  - `fixtures/`: Contains Playwright fixture setup files.
    - `schemaSetup.js`: Sets up fixtures for API schema validation, providing access to JSON schemas within tests.
    - `testSetup.js`: Sets up shared test fixtures for API testing, including API context, request/response utilities, and endpoint definitions.

## Key Features

- **API Request Handling:** The `requestUtils.js` simplifies making various types of HTTP requests. It handles URL construction and request logging.
- **Response Validation:** `responseUtils.js` provides a comprehensive set of functions to validate different aspects of API responses, ensuring data integrity and correctness.
- **JSON Schema Validation:** The framework incorporates JSON schema validation to automatically verify the structure and data types of API responses, improving test reliability.
- **Modular Design:** The code is organized into reusable modules, making it easy to maintain and extend.
- **Playwright Fixtures:** Utilizes Playwright's fixture mechanism to provide reusable test setup and data.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

- **API Key:** Store your API keys securely. It's highly recommended to use environment variables. For example:

  ```bash
  export API_KEY=your_api_key
  ```

  Then, access it in your tests using `process.env.API_KEY`.

- **Playwright Configuration:** Review and adjust the `playwright.config.js` file to match your project's needs (e.g., `baseURL`, `testMatch`).

### Running Tests

Execute the Playwright tests:

```bash
npx playwright test
# or
yarn playwright test
```
