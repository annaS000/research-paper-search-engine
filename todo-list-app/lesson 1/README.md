### **Lesson 1: Project Folder Structure and Initial Setup**

In this lesson, we’ll set up a clean project folder structure that will help you manage components and prepare for future features. We will also set up some basic tools to improve code quality and security.

#### **Step 1: Create the React App**
1. Open your terminal and navigate to the directory where you want to create the project.
2. Run the following command to create a new React app:
   ```bash
   npx create-react-app todo-list
   ```
   - This command sets up a React project with a default structure. Using `npx` ensures that you’re using the latest version of `create-react-app`.

3. Navigate into the new project folder:
   ```bash
   cd todo-list
   ```

4. Open the project in your code editor (e.g., Visual Studio Code):
   ```bash
   code .
   ```

#### **Step 2: Organizing the Project Folder**
To keep our code organized and make it easier to add features in the future, we'll set up a more structured folder layout.

1. In the `src` directory, create the following folders:
   - **`components/`**: For reusable UI components.
   - **`pages/`**: For page components. We'll start with a `HomePage` component to contain the main to-do list logic.
   - **`services/`**: For managing data operations, like fetching and updating data. We’ll set up a placeholder file for now.
   - **`utils/`**: For utility functions such as input validation and sanitization.
   - **`hooks/`**: For custom React hooks (we’ll explore these in future lessons).
   - **`contexts/`**: For setting up context providers in future lessons (useful for global state management).
   - **`styles/`**: For custom CSS styles.

2. Your `src` folder structure should now look like this:
   ```
   src/
   ├── components/
   ├── hooks/
   ├── pages/
   ├── services/
   ├── utils/
   ├── contexts/
   ├── styles/
   ├── App.js
   ├── index.js
   ```

#### **Step 3: Adding a `.env` File for Environment Variables**
Environment variables allow us to manage sensitive data like API URLs securely. Let’s set up a `.env` file that we'll use later when we integrate with an API.

1. In the root directory (outside the `src` folder), create a file named `.env`.

2. Add the following content to the `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```
   - **Explanation:** React requires environment variables to start with `REACT_APP_`. This variable is a placeholder for where we might send our data (like to a local server or an API). We’ll explore this further in future lessons.
   - **Security Note:** Environment variables help keep sensitive information out of the codebase. We use `.env` files for things like API keys, which we'll cover in later lessons.
   
3. Add `.env` to `.gitignore` to prevent it from being committed to the repository:
   ```
   # .gitignore
   .env
   ```

#### **Step 4: Install ESLint and Prettier for Code Linting and Formatting**
To maintain code consistency and catch errors early, we’ll set up ESLint and Prettier.

1. Run the following command to install ESLint and Prettier along with some necessary plugins:
   ```bash
   npm install eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

2. Create an ESLint configuration file:
   - In the root directory, create a file named `.eslintrc.json` and add the following:
     ```json
     {
      "env": {
         "browser": true,
         "es2021": true
      },
      "extends": [
         "eslint:recommended",
         "plugin:react/recommended",
         "prettier"
      ],
      "parserOptions": {
         "ecmaFeatures": {
            "jsx": true
         },
         "ecmaVersion": 12,
         "sourceType": "module"
      },
      "plugins": ["react"],
      "rules": {
         "react/prop-types": "off"
      }
      }
     ```
   - **Explanation:** This configuration sets up ESLint to work with React, using the recommended settings.

3. Create a Prettier configuration file:
   - In the root directory, create a file named `.prettierrc` and add the following:
     ```json
     {
       "singleQuote": true,
       "trailingComma": "es5"
     }
     ```
   - **Explanation:** This sets some formatting rules for your code. You can customize this based on your team's coding style.

4. Add the following scripts to `package.json` to format and lint the code:
   ```json
   "scripts": {
     "lint": "eslint 'src/**/*.{js,jsx}'",
     "format": "prettier --write 'src/**/*.{js,jsx,json,css,md}'"
   }
   ```
   - **Explanation:** This makes it easier to lint and format your code using npm commands.

#### **Step 5: Verify the Setup**
1. To check if everything is set up correctly, run the app:
   ```bash
   npm start
   ```
   - This should open a new browser window with the default React app running.

2. Verify ESLint and Prettier by making some formatting changes in `App.js`. Save the file and check if Prettier automatically formats it (if you have the Prettier plugin installed in your code editor).

#### **Final Notes for This Lesson:**
- **Why This Setup Matters:** Setting up a well-structured folder system now will save time and make it easier to scale the application as we add new features. Using tools like ESLint and Prettier ensures that our code is clean, consistent, and free of common errors.
- **Next Step:** In the next lesson, we’ll create the main page (`HomePage.js`) for our to-do list app and start implementing state management.

#### **Links for Further Reading:**
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)