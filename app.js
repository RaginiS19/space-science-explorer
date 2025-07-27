// app.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Combined Home Page: NASA APOD + SpaceX Launches
app.get('/', async (req, res) => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // go to yesterday
    const date = today.toISOString().split('T')[0];    
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`;
  const launchUrl = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5';

  try {
    const [apodRes, launchRes] = await Promise.all([
      fetch(apodUrl),
      fetch(launchUrl),
    ]);

    const apodData = await apodRes.json();
    const launchData = await launchRes.json();

    res.render('index', {
      apod: apodData,
      launches: launchData.results,
      selectedDate: date,
      error: null,
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.render('index', {
      apod: null,
      launches: [],
      selectedDate: date,
      error: 'Something went wrong loading the data.',
    });
  }
});

// NASA APOD by Date
app.get('/apod', async (req, res) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.media_type === 'image' || data.media_type === 'video') {
      res.render('apod', { apod: data, selectedDate: date, error: null });
    } else {
      res.render('apod', { apod: null, selectedDate: date, error: 'No image or video available for this date.' });
    }
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.render('apod', { apod: null, selectedDate: date, error: 'Error fetching data. Please try again.' });
  }
});

// SpaceX Launches
app.get('/launches', async (req, res) => {
  const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.render('launches', { launches: data.results, error: null });
  } catch (error) {
    console.error('Error fetching launches:', error);
    res.render('launches', { launches: [], error: 'Error fetching SpaceX launches.' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} else {
  module.exports = app;
}

// Export the app for testing
module.exports = app;
