# Space & Science Explorer

A Node.js + Express web application that brings you closer to the cosmos! This app fetches real-time data from NASA's Astronomy Picture of the Day (APOD) API and SpaceX Launch API to display fascinating space imagery and upcoming launches.

---

## Features

- View NASA's Astronomy Picture of the Day (APOD)
- See a list of upcoming SpaceX launches
- Select a date to explore APOD history
- Graceful error handling when APIs are unavailable
- Clean and responsive UI using EJS templates
- Basic test coverage using Jest and Supertest

---

## Project Structure

space-science-explorer/
├── public/ # Static assets (CSS, images)
├── views/ # EJS templates
│ ├── partials/ # Header & Footer
│ ├── index.ejs
│ ├── apod.ejs
│ └── launches.ejs
├── tests/ # Jest + Supertest test cases
│ └── app.test.js
├── app.js # Main Express app
├── .env # API keys and environment vars
├── package.json
└── README.md


---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/space-science-explorer.git
cd space-science-explorer

## Install dependencies

npm install

## Set up your .env file

Create a .env file in the root folder and add your NASA API key:

NASA_API_KEY=your_nasa_api_key_here

## Start the server
npm start
Open your browser and visit http://localhost:3000

## Run Tests

npm test

## Test suite includes checks for:

Homepage (/)
APOD route (/apod)
Launches route (/launches)

## APIs Used

NASA APOD API
SpaceX Launches API

## Author

Ragini Shirwalkar
Web Developer | UX/UI Designer

##License

This project is licensed under the MIT License.



---

Would you like me to create the file for you or help you commit and push it to your GitHub repo?


