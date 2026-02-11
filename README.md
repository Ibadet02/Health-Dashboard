MCP Patient Analysis System

A full-stack monorepo featuring a Model Context Protocol (MCP) backend and a React 19 frontend for clinical biomarker monitoring.

🏗 Architecture

This project is organized as a monorepo to maintain strict type safety between the data provider and the consumer.

Backend (/backend): A Node.js TypeScript environment. It functions as an MCP Server, utilizing the @modelcontextprotocol/sdk to expose patient data as actionable tools for AI models or the local frontend.

Frontend (/frontend): A React 19 application built with Vite. It leverages Material UI (MUI) for complex form elements and Styled Components for dynamic, theme-driven layout logic.

🚀 Setup and Run Instructions

1. Prerequisites

Node.js: v20.x or higher

npm: v10.x or higher

2. Installation

From the root directory, install dependencies for both services:

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install


3. Running the System

You will need two separate terminal instances:

Terminal 1: Backend (Server)

cd backend
npm run server:dev


To debug or test tools manually, run: npm run server:inspect

Terminal 2: Frontend (Vite)

cd frontend
npm run dev


🤖 Model Context Protocol (MCP) Implementation

How it Works

The backend implements the MCP standard to bridge the gap between local clinical data and AI capabilities. It uses a JSON-RPC based protocol to allow a "Host" (like Claude Desktop or our React client) to discover and execute functions.

Exposed Tools

The following tools are exposed via the MCP server:

analyze-biomarkers: Analyzes biomarker and identifies concerning values and potential health risks.

suggest-monitoring: Recommends which biomarkers need closer attention.

Why these tools? These were selected to enable an LLM to read data.

💡 Engineering Decisions

TypeScript Shared Types: I utilized indexed access types (e.g., Patient['id']) across the stack to ensure that a Biomarker can never be orphaned from a Patient at the type level.

Live Update Logic: Implemented a "Silent Loading" pattern for the 3-second polling interval. This ensures the UI doesn't "glitch" or flash when the background MCP request is in flight.

Hybrid Styling:

MUI was chosen for complex interactive components (Select) to ensure accessibility standards.

Styled Components were used for layout wrappers to keep the JSX clean and allow for "Transient Props" (using the $ prefix) to drive styles without polluting the DOM.

Error Simulation: The loadData architecture includes a dedicated setError state and try/catch/finally blocks to handle the unique timeouts that can occur with MCP transport layers.

🛠 Project Structure

.
├── frontend/                # Vite + React 19 Application
│   ├── src/components/      # UI Components (PatientDetail, etc.)
│   └── src/api/             # MCP Client logic
├── backend/                  # Node.js MCP Server
│   ├── src/mcp/             # MCP Tool definitions and Server logic
│   └── src/index.ts         # Server entry point
└── README.md                # Root Documentation
