### Table of Contents
- [Lesson 1: Project Folder Structure and Initial Setup](#lesson-1-project-folder-structure-and-initial-setup)
  - [Step 1: Create the React App](#step-1-create-the-react-app)
  - [Top-Level Project Structure](#top-level-project-structure)
    - [1. `node_modules/`](#1-nodemodules)
    - [2. `public/`](#2-public)
    - [3. `src/`](#3-src)
    - [4. `.gitignore`](#4-gitignore)
    - [5. `package.json`](#5-packagejson)
    - [6. `README.md`](#6-readmemd)
    - [7. `package-lock.json`](#7-package-lockjson)
  - [Summary of Project Anatomy](#summary-of-project-anatomy)
  - [Step 2: Organizing the Project Folder](#step-2-organizing-the-project-folder)
  - [Step 3: Adding a `.env` File for Environment Variables](#step-3-adding-a-env-file-for-environment-variables)
  - [Step 4: Install ESLint and Prettier for Code Linting and Formatting](#step-4-install-eslint-and-prettier-for-code-linting-and-formatting)
  - [Step 5: Verify the Setup](#step-5-verify-the-setup)
- [Final Notes for This Lesson](#final-notes-for-this-lesson)
- [Links for Further Reading](#links-for-further-reading)

---

### **Lesson 1: Project Folder Structure and Initial Setup**

In this lesson, we’ll set up a clean project folder structure that will help you manage components and prepare for future features. We will also set up some basic tools to improve code quality and security.

#### **Step 1: Create the React App**
1. Open your terminal and navigate to the directory where you want to create the project.
2. Run the following command to create a new React app:
   ```bash
   npx create-react-app todo-list
   ```
   - The `npx create-react-app` command generates a well-structured project setup for React applications. It provides a boilerplate project that follows modern best practices and is designed to streamline the development process. `npx` ensures that you’re using the latest version of `create-react-app`.

#### **Top-Level Project Structure**

After running `npx create-react-app my-app`, you’ll get a directory structure similar to this:

```
my-app/
├── node_modules/
├── public/
├── src/
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

##### **1. `node_modules/`**
- **Purpose:** Contains all the dependencies (JavaScript packages) required for your React app to run.
- **Details:** When you run `npm install`, it installs all the dependencies listed in `package.json` into this directory.
- **Important Note:** This folder can get large since it includes not only the main dependencies but also all their nested dependencies.

##### **2. `public/`**
- **Purpose:** Contains static assets and the entry HTML file (`index.html`) for your React application.
- **Common Files:**
  - **`index.html`**: 
    - The main HTML file for the app. This file includes a `<div>` with an ID of "root" where the React app is mounted.
    - You can add meta tags, links to external stylesheets, and other modifications to this file to customize the HTML page.
  - **`favicon.ico`**:
    - The default favicon for the app. You can replace it with your custom favicon to match your brand.
  - **`manifest.json`**:
    - Contains metadata about your app, such as the name, icons, and theme colors. It is important for Progressive Web Apps (PWAs) and dictates how your app appears when saved to a device's home screen.
  - **`robots.txt`**:
    - Used to control the crawling of your site by web crawlers and search engine bots. Adjust this file to manage how search engines index your site.

- **Important Note:** The content of the `public/` folder is copied directly into the build folder when you build your application (`npm run build`). Files in this directory won't go through the Webpack bundling process.

##### **3. `src/`**
- **Purpose:** Contains all the JavaScript/TypeScript source code for your React application. This is where you'll spend most of your development time.
- **Common Files and Folders:**
  - **`index.js`** (or `index.tsx` for TypeScript projects):
    - The entry point of your React app. This file renders the root component (`App`) into the DOM.
    - It imports the `App` component and calls `ReactDOM.render` to mount the app inside the `public/index.html` file’s "root" div.
    - By default, it includes the following line:
      ```javascript
      ReactDOM.createRoot(document.getElementById('root')).render(<App />);
      ```
  - **`App.js`** (or `App.tsx` for TypeScript projects):
    - The main component of your React application. This is the component that `index.js` renders.
    - By default, it contains sample content to demonstrate how a React component is structured, styled, and used.
  - **`App.css`**:
    - The default stylesheet for the `App` component. This is where you can define styles for the `App` component or modify the existing styles.
  - **`index.css`**:
    - The global stylesheet for the application. You can use this file to define global styles or CSS resets.
  - **`logo.svg`**:
    - A sample SVG logo file used in the default `App` component. You can replace this with your logo or other images.
  - **`App.test.js`**:
    - A sample test file that demonstrates how to write unit tests for the `App` component using Jest and React Testing Library.
  - **`reportWebVitals.js`**:
    - A file to measure and report the performance of your app. It provides an example of how to collect and log web vitals metrics.
    - By default, it logs web vital metrics to the console, but you can modify it to send data to an analytics endpoint.
  - **`setupTests.js`**:
    - A configuration file for setting up Jest and React Testing Library. It includes necessary setup to use the testing library out-of-the-box.

##### **4. `.gitignore`**
- **Purpose:** Specifies files and directories that should be ignored by Git version control.
- **Commonly Ignored Files:** The default `.gitignore` file excludes `node_modules/`, build files, and other temporary files generated during development to keep the repository clean.

##### **5. `package.json`**
- **Purpose:** The core configuration file for your React application.
- **Key Contents:**
  - **`name`, `version`, `description`**: Metadata about the project.
  - **`scripts`**: Defines custom scripts you can run using `npm`. By default, includes:
    - `"start"`: Runs the app in development mode (`npm start`).
    - `"build"`: Builds the app for production (`npm run build`).
    - `"test"`: Runs the test suite (`npm test`).
    - `"eject"`: Ejects the app from `create-react-app` (irreversible) to expose full configuration.
  - **`dependencies`**: Lists the runtime dependencies for the application (e.g., `react`, `react-dom`).
  - **`devDependencies`**: Lists development-only dependencies (e.g., testing libraries).
  - **`browserslist`**: Specifies the target browsers for the app, allowing tools like Autoprefixer to support specific CSS properties based on browser compatibility.

##### **6. `README.md`**
- **Purpose:** A markdown file providing an overview of the project.
- **Default Content:** Includes basic instructions on how to run, build, and test the application. It provides useful information for both the developer and anyone new to the project.

##### **7. `package-lock.json`**
- **Purpose:** Lock files that ensure consistent dependency installation across environments.
- **Details:** These files contain a snapshot of the dependency tree with specific versions to make sure that everyone working on the project (or any automated deployment) installs the exact same dependencies.
- **`package-lock.json`**: Created if you use npm to manage packages.

#### **Summary of Project Anatomy**
- **`node_modules/`**: Holds all installed dependencies.
- **`public/`**: Stores static files (e.g., `index.html`) and assets.
- **`src/`**: Contains all source code, including components, styles, tests, and utilities.
- **Configuration Files (`.gitignore`, `package.json`, etc.)**: Define project setup, dependencies, scripts, and version control rules.

This structure provides a solid foundation for React development, following best practices for modularity, scalability, and maintainability. You can add more directories (`components`, `pages`, `utils`, etc.) within the `src/` folder to organize your code as your project grows.

---

#### **Step 2: Organizing the Project Folder**
(Instructions for this step)

#### **Step 3: Adding a `.env` File for Environment Variables**
(Instructions for this step)

#### **

Step 4: Install ESLint and Prettier for Code Linting and Formatting**
(Instructions for this step)

#### **Step 5: Verify the Setup**
(Instructions for this step)

---

### **Final Notes for This Lesson**
- **Why This Setup Matters:** Setting up a well-structured folder system now will save time and make it easier to scale the application as we add new features. Using tools like ESLint and Prettier ensures that our code is clean, consistent, and free of common errors.
- **Next Step:** In the next lesson, we’ll create the main page (`HomePage.js`) for our to-do list app and start implementing state management.

### **Links for Further Reading**
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---