Project Commands
This project uses TypeScript, Jest for testing, ESLint for linting, and GitHub Actions for CI. Below is a list of useful commands to help you get started.

Setup
Install all dependencies for the project:

`npm install`

Build
Compile TypeScript files to JavaScript:

`npm run build`

Lint
Run ESLint to check for code quality and formatting issues:

`npm run lint`

Test
Run Jest to execute all tests:

`npm test`

Git Commands
Initialize Repository and Set Remote
If you haven’t already done so, initialize the Git repository and add the remote:

git init
git remote add origin https://github.com/your-username/your-repo.git

Branch Management
Create and switch to a new branch:

git checkout -b new-branch-name

Set up tracking for the main branch (if not already set):

git branch --set-upstream-to=origin/main main

Pushing Changes
Push changes to the current branch:

git push

If pushing a new branch, use:

git push --set-upstream origin new-branch-name

GitHub Actions
The CI pipeline is set up in .github/workflows/CI.yml and will run automatically on pull requests to the main branch. No additional commands are needed to trigger the workflow manually.

