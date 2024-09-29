## **How to Use the Script:**
1. Make the script executable:
   ```bash
   chmod +x setup-localstorage.sh
   ```
2. Run the script:
   ```bash
   ./setup-localstorage.sh
   ```

## **Explanation of the Script:**
1. **Define Project Directory:** Sets the path to the project's root directory relative to the script's location.
2. **Directory Check:** Checks if the project directory exists before proceeding to ensure the previous setup has been completed.
3. **Navigate to Project Directory:** Moves into the project directory to modify files in the correct context.
4. **Update `HomePage.js`:** Overwrites `HomePage.js` with the new code that integrates `localStorage` to persist to-do items. This code:
   - Loads the to-do list from `localStorage` upon initialization.
   - Uses the `useEffect` hook to update `localStorage` whenever the `todos` state changes.
5. **Print Success Message:** Indicates that the setup for Lesson 5 is complete.

### **Next Steps:**
- Start the app using `npm start` to test the changes.
- Verify that you can add, toggle, and remove to-do items and that the list persists using `localStorage`.

With this script, we have automated the implementation of both `localStorage` persistence and item removal functionality.