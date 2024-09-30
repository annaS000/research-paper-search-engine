Here's a comprehensive guide to help onboard new developers for the React project:

### 1. **Setting Up Git/GitHub CLI**

#### Install Git
1. Download and install Git from [git-scm.com](https://git-scm.com/).
2. Configure Git with your information:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

#### Install GitHub CLI
1. Download the GitHub CLI from [cli.github.com](https://cli.github.com/).
2. Authenticate with your GitHub account:
   ```bash
   gh auth login
   ```
   - Select GitHub.com.
   - Choose HTTPS for the preferred protocol.
   - Authenticate using a browser.

### 2. **Cloning the Repository**

1. Clone the repository using HTTPS:
   ```bash
   git clone https://github.com/your-org/your-repo.git
   ```
2. Navigate into the project directory:
   ```bash
   cd your-repo
   ```

### 3. **Creating a Feature Branch**

1. Follow the naming convention: `feature/<descriptive-name>` (e.g., `feature/add-user-auth`).
2. Create and switch to the new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### 4. **Committing Code**

1. Add changes to the staging area:
   ```bash
   git add .
   ```
2. Commit changes with a detailed message. Make sure to use [conventional commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: Add user authentication module"
   ```
   - Use prefixes like `feat` (feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor`, etc.
3. Push the branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

### 5. **Creating a Pull Request (PR)**

#### Using GitHub CLI
1. Create a PR from the feature branch:
   ```bash
   gh pr create --base main --title "Add user authentication" --body "This PR adds user authentication using OAuth."
   ```
   
#### On GitHub
1. Navigate to the repository on GitHub.
2. You will see a prompt to create a pull request for the recently pushed branch. Click on "Compare & pull request".
3. Fill in the PR template with the following details:
   - **Title:** Brief summary of the changes (e.g., `Add OAuth-based user authentication`).
   - **Description:** A detailed description of what changes have been made, why they are necessary, and any relevant context.
   - **Linked Issues:** Mention related issues (e.g., `Closes #12`).
   - **Testing:** Include details on how to test the new feature or fix.

### 6. **Reviewing Code for Merging**

1. Assign at least one reviewer to the PR.
2. Ensure the code passes ESLint and Prettier checks, as well as all automated tests.
3. Add comments and suggestions for improvements directly on the PR code if needed.
4. Once all issues are addressed, and the code is reviewed, merge the PR using the "Squash and Merge" option to keep the commit history clean.

### 7. **Using ESLint and Prettier**

#### ESLint Setup
1. Make sure ESLint is installed and configured in the project. Add a configuration file `.eslintrc.js`:
   ```bash
   npm install eslint --save-dev
   npx eslint --init
   ```
2. Include rules for code quality and standards. For example, ensure use of single quotes, consistent indentation, and no unused variables.

#### Prettier Setup
1. Install Prettier:
   ```bash
   npm install --save-dev prettier
   ```
2. Create a `.prettierrc` file in the project root with preferred configurations:
   ```json
   {
     "singleQuote": true,
     "trailingComma": "all",
     "tabWidth": 2,
     "semi": true
   }
   ```
3. Set up a pre-commit hook using `lint-staged` and `husky` to automatically format code:
   ```bash
   npm install --save-dev husky lint-staged
   npx husky install
   ```
   Then, in `package.json`:
   ```json
   "lint-staged": {
     "*.js": "eslint --fix",
     "*.{js,jsx,ts,tsx,json,css,scss,md}": "prettier --write"
   }
   ```
4. Run ESLint and Prettier before each commit to ensure code quality:
   ```bash
   npm run lint
   npm run format
   ```

### 8. **Establishing Project Norms**

- **Branch Naming:** Use prefixes like `feature/`, `bugfix/`, `hotfix/`, or `chore/`.
- **Commit Messages:** Use the [conventional commits](https://www.conventionalcommits.org/) format.
- **PR Comments:** Always include a detailed description of changes, context, and any related issues. Use markdown formatting for clarity.
- **Code Review:** Provide constructive feedback. Avoid approving a PR with unresolved issues or if ESLint/Prettier checks fail.
- **Merge Strategy:** Use "Squash and Merge" to keep the commit history concise.

By following these steps, developers can maintain consistency, code quality, and a streamlined workflow throughout the project.