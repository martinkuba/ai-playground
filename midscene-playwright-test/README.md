# Midscene Playwright Test

This project demonstrates automated browser testing using Playwright with Midscene AI for intelligent test automation.

## Prerequisites

- An OpenAI API key for Midscene AI features

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Set up your OpenAI API key:
   - Open the `.env` file in the root directory
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

```
OPENAI_API_KEY=your_actual_key_here
```

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/ebay-search.spec.ts
```

To run tests in headed mode (to see the browser UI):

```bash
npx playwright test --headed
```

## Viewing Test Reports

After running tests, you can view the Midscene report in:
```
midscene_run/report/
```

## Using Midscene AI in Tests

Midscene AI enables natural language commands in your tests. Examples:

```typescript
// Perform actions with natural language
await ai('type "Headphones" in search box, hit Enter');

// Query for information
const items = await aiQuery(
  "{itemTitle: string, price: Number}[], find item in list and corresponding price"
);

// Make assertions
await aiAssert("There is a category filter on the left");
```
