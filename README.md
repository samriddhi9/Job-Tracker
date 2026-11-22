# Job-Tracker
This program is under progress......

A simple Angular app to track job applications. Add, view, edit and delete jobs, with data served from a local mock REST API built with JSON Server.

> **Status:** Work in progress. Core CRUD is working; more features are planned.

## Features
- Create, read, update and delete job applications (CRUD)
- Reusable components for a consistent UI
- Null checks and safe handling of missing API data
- API integration using Angular `HttpClient`

## Tech Stack
- Angular
- TypeScript, RxJS
- HTML5, CSS3
- JSON Server (mock REST API)

## Getting Started

### Installation
1. Clone this repository and open the project folder
2. Install dependencies
   ```bash
   npm install
   ```

### Run the mock API (required)
The app reads its data from a local JSON Server. Without it, no data will show.

In one terminal:
```bash
npm run json:server
```
The API runs at `http://localhost:3000`.

### Run the app
In a second terminal:
```bash
ng serve
```
The app runs at `http://localhost:4200`.

> Both must run at the same time: the API on port 3000 and the Angular app on port 4200.

## Roadmap
- Unit tests with Jasmine
- Deployment

## Author
Samriddhi Bhosle

