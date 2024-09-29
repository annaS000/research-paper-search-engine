#!/bin/bash

# Set the project name
PROJECT_NAME="todo-list"

# Step 1: Create a new React app
npx create-react-app $PROJECT_NAME

# Navigate into the project directory
cd $PROJECT_NAME || exit

# Step 2: Set up the folder structure
mkdir -p src/components src/hooks src/pages src/services src/utils src/contexts src/styles

# Step 3: Create a .env file with a sample environment variable
echo "REACT_APP_API_URL=http://localhost:3000" > .env

# Add .env to .gitignore to prevent committing sensitive information
echo ".env" >> .gitignore

# Step 4: Install ESLint, Prettier, and necessary plugins
npm install eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --save-dev

# Step 5: Create ESLint configuration file (.eslintrc.json)
cat <<EOL > .eslintrc.json
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
EOL

# Step 6: Create Prettier configuration file (.prettierrc)
cat <<EOL > .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5"
}
EOL

# Step 7: Update package.json to include lint and format scripts using Node.js
node - <<EOF
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json'));
packageJson.scripts.lint = "eslint \\"src/**/*.{js,jsx}\\"";
packageJson.scripts.format = "prettier --write \\"src/**/*.{js,jsx,json,css,md}\\"";
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
EOF

# Print success message
echo "React app setup completed successfully! Navigate to the $PROJECT_NAME directory and start building your app."
