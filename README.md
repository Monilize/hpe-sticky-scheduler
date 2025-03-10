# Sticky Notes App

This project is a **React + TypeScript + Vite** application that provides a collaborative sticky notes system with Redux for state management. The app allows users to create, update, drag, and delete sticky notes while persisting their positions and associated team member details.

## Features

- **Fast & Lightweight**: Powered by Vite for quick development and hot module replacement (HMR).
- **State Management**: Uses **Redux Toolkit** to manage sticky notes, team members, and application state.
- **Drag & Drop**: Notes can be moved around freely while persisting their positions.
- **Dynamic Team Member Colors**: Sticky notes inherit colors from assigned team members.
- **CRUD Operations**: Create, update, and delete notes seamlessly.
- **Priority-Based Highlighting**: Notes are styled based on priority levels (Low, Medium, High).
- **ESLint & Prettier Configured**: Ensures a clean and maintainable codebase with type-aware linting.

## Installation & Setup

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **pnpm** / **npm** / **yarn** installed globally

### Clone the Repository

```sh
 git clone https://github.com/Monilize/hpe-sticky-scheduler.git
 cd hpe-sticky-scheduler
```

### Install Dependencies

```sh
 npm install  # or pnpm install / yarn install
```

### Start the Development Server

```sh
 npm run dev  # or pnpm run dev / yarn dev
```

The application should now be running at `http://localhost:5173/` (or a different port if configured).

## Expanding ESLint Configuration

If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

Additionally, install **eslint-plugin-react-x** and **eslint-plugin-react-dom** for React-specific linting:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
