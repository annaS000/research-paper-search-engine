# research-paper-search-engine
A basic app where users can search for research papers by keyword and display a list of results. Users will see the title, author, abstract, and a link to the full text.

---

## **Lesson 1: Setting Up Your Development Environment and Project**

### 1.1. **What You'll Need Before Starting**
Before diving into coding, we need to set up the development environment. This includes installing the necessary software, setting up version control (Git), and initializing a React project.

#### **Step 1: Install Node.js and npm**
- **What is Node.js**: Node.js is a runtime environment that lets you run JavaScript outside of a browser (on your computer).
- **What is npm**: npm (Node Package Manager) is a tool that allows you to install libraries and tools that you'll use for your project.

**Installation Steps**:
1. Go to the [Node.js official website](https://nodejs.org/).
2. Download the **LTS** version (long-term support) for your operating system.
3. Follow the installation instructions for your OS (Windows, Mac, or Linux).
4. Verify the installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v
   ```
   You should see version numbers for both Node.js and npm.

#### **Step 2: Install Git**
- **What is Git**: Git is a version control system that tracks changes to your code. It helps you manage different versions of your project and collaborate with others.

**Installation Steps**:
1. Download Git from the [official Git website](https://git-scm.com/).
2. Follow the installation instructions for your operating system.
3. After installation, verify that Git is installed by running:
   ```bash
   git --version
   ```

---

### 1.2. **Setting Up a GitHub Repository**
Before we start building, let's set up a GitHub repository to track our progress and maintain version control. We’ll commit our code at different stages and push it to a remote repository.

#### **Step 1: Clone the Repository Locally**
1. Log in to your GitHub account.
2. Navigate to the `research-paper-search-engine` repo
3. Copy the URL of your GitHub repository.
4. Open your terminal, navigate to the folder where you want to store the project, and run:
   ```bash
   git clone https://github.com/your-username/research-paper-search-engine.git
   ```
3. Navigate to the cloned repository folder:
   ```bash
   cd research-paper-search-engine
   ```

#### **Step 2: Initialize the Repository Locally (If You Haven't Already)**
1. Initialize Git inside your project folder:
   ```bash
   git init
   ```
2. Add the remote repository you cloned earlier:
   ```bash
   git remote add origin https://github.com/your-username/research-paper-search-engine.git
   ```

Now that Git is set up, we can track changes and commit our code as we build.

---

### 1.3. **Creating the React Project**

Now that our repository is set up, it’s time to create the actual React application.

#### **Step 1: Install `create-react-app`**
- **What is `create-react-app`**: This is a tool that sets up a new React project with all the necessary configuration out of the box, so you can focus on building the app.

To install `create-react-app`, open your terminal (in the folder where you cloned your GitHub repository) and run:
```bash
npx create-react-app .
```
The `.` tells it to install the React app in the current folder. This may take a few minutes.

#### **Step 2: Run the Application**
Once the setup is complete, you can start your development server by running:
```bash
npm start
```
This will start a local development server, and you can access your app in a browser at `http://localhost:3000`. You should see a basic React app running!

---

### 1.4. **Understanding Git Best Practices**
Now that we have the initial project created, it's time to cover some best practices for using Git in a real-world project. These practices are important, especially when working in a team or contributing to open-source projects.

#### **Best Git Practices**:
1. **Commit Often**: Make frequent commits with clear, meaningful messages. This helps you track changes over time.
   - Example:
     ```bash
     git add .
     git commit -m "Initial setup: Create React app"
     ```

2. **Write Descriptive Commit Messages**: A good commit message tells others (or your future self) what the commit does.
   - Example: `git commit -m "Set up search form component"`

3. **Branching**: When adding new features or fixing bugs, create a new branch. This keeps the main branch (`main` or `master`) clean and production-ready.
   - Example: To create a new branch for a feature:
     ```bash
     git checkout -b feature/search-component
     ```

4. **Push to GitHub**: Once you have made your commits, push your code to GitHub to back it up and share with others:
   ```bash
   git push origin feature/search-component
   ```

---

## **Lesson Outline for the Rest of the Project**

Now that we have the environment set up and Git ready, let's outline the lessons that will guide us through the development of the app:

---

### **Lesson 2: Building the Search Functionality**
- **Goals**: 
  - Learn how to create a search input.
  - Use React’s `useState` hook to manage form input.
  - Prepare for integrating the CORE API by simulating search results.

- **Steps**:
  1. Create a simple search form.
  2. Manage form state with `useState`.
  3. Display mock search results in a list to simulate the output of the API.

---

### **Lesson 3: Integrating the CORE API**
- **Goals**:
  - Learn how to fetch data from the CORE API.
  - Use React’s `useEffect` hook to make API calls.
  - Display real search results dynamically based on user input.

- **Steps**:
  1. Register for a free API key from the CORE API.
  2. Make API requests using `fetch` or Axios.
  3. Parse and display the search results in a styled list or grid.

---

### **Lesson 4: Creating Reusable Components for Results**
- **Goals**:
  - Break down the app into smaller, reusable components.
  - Pass data between components using props.

- **Steps**:
  1. Create a `SearchResult` component to display individual results.
  2. Pass props from the main search component to the result component.

---

### **Lesson 5: Error Handling and Loading States**
- **Goals**:
  - Implement error handling for API calls.
  - Show loading indicators while data is being fetched.

- **Steps**:
  1. Handle loading states and display a spinner while waiting for results.
  2. Show error messages if the API request fails.

---

### **Lesson 6: Styling the Application**
- **Goals**:
  - Learn how to style your React app using CSS or a framework like Bootstrap.
  - Make the app responsive and user-friendly.

- **Steps**:
  1. Apply basic CSS to improve the UI.
  2. Use a CSS framework (e.g., Bootstrap) for faster and responsive layout design.

---

### **Lesson 7: Final Touches and Deployment**
- **Goals**:
  - Optimize the app for production.
  - Deploy the application to a hosting service like Netlify or Vercel.

- **Steps**:
  1. Optimize the app (e.g., minification, removing unused files).
  2. Deploy to AWS?.
