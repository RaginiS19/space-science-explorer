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

// NASA APOD by Date + Mini Gallery
app.get('/apod', async (req, res) => {
  const selectedDate = req.query.date || new Date().toISOString().split('T')[0];
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`;

  // Generate previous 5 dates
  const getPreviousDates = (baseDate, count) => {
    const base = new Date(baseDate);
    const dates = [];
    for (let i = 1; i <= count; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  try {
    // Fetch main APOD
    const apodRes = await fetch(apodUrl);
    const apod = await apodRes.json();

    // Fetch previous 5 days of APODs
    const previousDates = getPreviousDates(selectedDate, 5);
    const galleryPromises = previousDates.map(date =>
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`).then(res => res.json())
    );
    const apodGallery = await Promise.all(galleryPromises);

    res.render('apod', {
      apod,
      selectedDate,
      apodGallery,
      error: null
    });
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.render('apod', {
      apod: null,
      selectedDate,
      apodGallery: [],
      error: 'Error fetching APOD data. Please try again.'
    });
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

// Start server only if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} else {
  module.exports = app;
}

app.get('/favorites', (req, res) => {
  res.render('favorites');
});
