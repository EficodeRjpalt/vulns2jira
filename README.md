# Vulnerabilities to Jira Issues

## Description

A brief description of your project.

## Installation

To install the project dependencies, run:

`npm install`

## Scripts

### Clean

To clean the `dist` directory, run:

`npm run clean`

### Build

To clean the `dist` directory and compile the TypeScript files, run:

`npm run build`

### Test

To clean the `dist` directory and run the tests, run:

`npm test`

## GitHub Actions

This project uses GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/ci.yml`.

### Workflow Configuration

name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'  # Specify the Node.js version you want to use

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run tests
        run: npm test

## TypeScript Configuration

Ensure that your `tsconfig.json` is properly configured to include the `types` directory.

### Example `tsconfig.json`

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*.ts", "src/global.d.ts"]
}

## Directory Structure

Here is an example directory structure for the project:

project-root/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── __tests__/
│   │   ├── __mocks__/
│   │   │   └── mockData.ts
│   │   └── githubApi.test.ts
│   └── githubApi.ts
├── package.json
└── tsconfig.json

## License

Include your project's license information here.
