# Week 06 : Asynchronous JavaScript

## Author

- **Name:** Tracey Wanjiru
- **GitHub:** [@traceywanjiru](https://github.com/traceywanjiru)
- **Date:** November 9, 2026

## Project Description

A responsive Weather Dashboard web application built using modern asynchronous JavaScript. The application fetches live meteorological data from the OpenWeatherMap API, updates the DOM dynamically, handles network and input errors gracefully, and persists search history using browser storage.

## Technologies Used

1. HTML5 & CSS3 (Modern Flexbox/Grid styling)

2. JavaScript (ES6+, Async/Await, Fetch API)

3. OpenWeatherMap API

4. Browser LocalStorage

5. Git, GitHub, and GitHub Actions (for automated secure deployment)

## Features

1. Live Weather Search: Enter any city name to fetch real-time weather conditions.

2. Comprehensive Metrics: Displays city name, dynamic weather icons, temperature in Celsius, weather description, feels-like temperature, humidity percentage, wind speed, and atmospheric pressure.

3. Robust Error Handling: Provides user-friendly error feedback for invalid city names, 401/404 API responses, and network connectivity issues, complete with a loading state indicator.

4. Recent Searches: Automatically saves the last 5 searched cities to `localStorage,` allowing users to click on any recent search item to instantly query it again.

5. Secure Configuration: Implements a git-ignored `config.js` architecture protected by GitHub Actions environment secrets during deployment.

## How to Run

1. Clone this repository to your local machine.

2. Copy config.example.js to config.js.

3. Copy config.example.js to config.js and add your key.

4. Open index.html in your browser or run it via a local development server (such as Live Server)

## Lessons Learned

1. Implementing asynchronous JavaScript control flows using `async, await,` and `try...catch...finally` blocks.
2. Communicating with external web services via the browser's native `fetch()` API and parsing JSON responses.
3. Storing and retrieving state data locally using `localStorage.setItem()` and `localStorage.getItem()`.
4. Protecting sensitive credentials in static frontend applications by combining `.gitignore` exclusions with automated GitHub Actions secret injection.

## Challenges Faced

1. Ensuring that the private API key was never accidentally committed into version control history while still allowing the static GitHub Pages deployment to successfully build and render the app.

2. Managing asynchronous loading states cleanly to prevent UI race conditions during rapid user searches.

## Live Demo (if deployed)

[View Live Demo](https://your-deployed-url.com)
