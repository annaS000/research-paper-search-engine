## **How to Use the Script:**
1. Save the script as `setup-addtodo.sh` in the `lesson 4/auto-setup/` directory.
2. Make the script executable:
   ```bash
   chmod +x setup-addtodo.sh
   ```
3. Run the script:
   ```bash
   ./setup-addtodo.sh
   ```

## **Explanation of the Script:**
1. **Define Project Directory:** Sets the path to the project's root directory relative to the script's location.
2. **Directory Check:** Checks if the project directory exists before proceeding to ensure the previous setup has been completed.
3. **Navigate to Project Directory:** Moves into the project directory to perform file operations in the correct context.
4. **Step 1: Create `AddTodo.js`:**
   - Creates the `components` folder (if it doesn't already exist).
   - Writes the `AddTodo.js` file, defining the `AddTodo` component with the input field, form handling, and callback to the parent (`addTodo`).
5. **Step 2: Update `HomePage.js`:**
   - Overwrites `HomePage.js` to import and use the `AddTodo` component, integrating the new functionality into the `HomePage`.
6. **Success Message:** Prints a message indicating the setup for Lesson 4 is complete.

After running this script, the `AddTodo` component will be created, and the `HomePage.js` will be updated to use the new `AddTodo` component.