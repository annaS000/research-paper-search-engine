## **How to Use the Script:**
1. Save the script as `setup-todolist.sh` in the `lesson 3/auto-setup/` directory (similar structure as shown in your previous uploads).
2. Make the script executable:
   ```bash
   chmod +x setup-todolist.sh
   ```
3. Run the script:
   ```bash
   ./setup-todolist.sh
   ```

After running this script, the `TodoList` component will be created, and the `HomePage.js` component will be updated to use the new `TodoList` component.

## **Explanation of the Script:**
1. **Define Project Directory:** Sets the path to the project's root directory relative to the script's location.
2. **Directory Check:** Checks if the project directory exists before proceeding to ensure that the previous setup has been completed.
3. **Navigate to Project Directory:** Moves into the project directory so that the subsequent file operations affect the correct project.
4. **Step 1: Create `TodoList.js`:**
   - Creates the `components` folder (if it doesn't already exist).
   - Writes the `TodoList.js` file to the `components` directory, defining the `TodoList` component with the logic to display and interact with to-do items.
5. **Step 2: Update `HomePage.js`:**
   - Rewrites `HomePage.js` to import and use the new `TodoList` component, implementing the functionality outlined in the lesson.
6. **Success Message:** Prints a message indicating that the setup for Lesson 3 is complete.

### **Next Steps:**
- Start the app using `npm start` to test the changes.
- Click the "Add Sample To-Do" button and use the list to see how the new component works.

This script automates the creation and integration of the `TodoList` component, streamlining the process as we continue building the app.