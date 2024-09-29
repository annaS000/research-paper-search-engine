## **How to Use the Script**
1. Make the script executable:
   ```bash
   chmod +x setup-homepage.sh
   ```
2. Run the script:
   ```bash
   ./setup-homepage.sh
   ```

## **Explanation of the Script**
- **Step 1: Create `HomePage.js`:**
  - Creates the `pages` directory inside `src` if it doesn't exist.
  - Writes the `HomePage.js` code into the file, implementing the state management (`useState`), `addTodo`, and `toggleTodo` functions, as well as the basic JSX structure.

- **Step 2: Update `App.js`:**
  - Overwrites `App.js` with the code necessary to import and render the `HomePage` component.

- **Validation:** The script checks if the project directory (`todo-list`) exists before proceeding. This helps ensure that the script is run in the correct context.

- **Final Message:** Prints a message to inform you that the setup for Lesson 2 is complete.

### **Next Steps**
- After running this script, you can start the app using `npm start` to see the changes in action.

This script sets up the main page component (`HomePage.js`) with basic state management, laying the foundation for the rest of the app.