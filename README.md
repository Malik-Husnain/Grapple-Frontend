# Grapple Code Test - Senior Fullstack Developer

Welcome to the **Grapple Code Test**! This project is a simple Next.js application set up to build an MVP chatbot. The chatbot’s purpose is to engage with clients, provide case updates, and potentially offer legal advice using data from **Pipedrive** (CRM) and into an AI service provider of choice.

## Stack Overview

### Core Tech

- **Next.js**: React framework for creating web applications.
- **React** & **React-DOM**: Essential libraries for building user interfaces.
- **TypeScript**: Adds type safety for more reliable development.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.

### Development Tools

- **ESLint**: Ensures code consistency and quality.

## Setup

### Prerequisites

Ensure you have:
- **Node.js** and **npm** installed.

### Steps to Start

1. **Clone the Repo**:
    ```bash
    git clone <repository-url>
    cd grapple-code-test
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The app runs on [http://localhost:3000](http://localhost:3000).

4. **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Project Overview

This test provides a simple Next.js app layout with a placeholder API fetch. You’ll replace the example API with calls to Pipedrive and the chosen API service as required for the project.

### Documentation

1. **Pipedrive API reference**: [Pipedrive API](https://developers.pipedrive.com/docs/api/v1)
2. **OpenAI API reference**: [OpenAI API](https://platform.openai.com/docs/api-reference/assistants) (or another selected service)

### Key Features

- **UI Layout**: Includes a header with logo and title, and a main content area displaying JSON data.
- **API Fetching**: The `GET` function in `pages/index.tsx` shows how to fetch and display API data.

## Available Scripts

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Linting**: `npm run lint`

Good luck with the test!