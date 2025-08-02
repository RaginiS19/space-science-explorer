// app.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const NASA_API_KEY = process.env.NASA_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// In-memory storage for admin data (in production, use a database)
let spaceData = {
  favorites: [],
  customLaunches: [],
  spaceNews: []
};

// API Routes for React Frontend
app.get('/api/apod/:date?', async (req, res) => {
  try {
    const date = req.params.date || new Date().toISOString().split('T')[0];
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`;
    const response = await fetch(apodUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.get('/api/launches', async (req, res) => {
  try {
    const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10';
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch launch data' });
  }
});

app.get('/api/favorites', (req, res) => {
  res.json(spaceData.favorites);
});

app.post('/api/favorites', (req, res) => {
  const { title, url, date, explanation, media_type } = req.body;
  const newFavorite = { title, url, date, explanation, media_type, id: Date.now() };
  spaceData.favorites.push(newFavorite);
  res.json(newFavorite);
});

app.delete('/api/favorites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  spaceData.favorites = spaceData.favorites.filter(fav => fav.id !== id);
  res.json({ message: 'Favorite removed' });
});

// Admin API Routes
app.get('/api/admin/data', (req, res) => {
  res.json(spaceData);
});

app.post('/api/admin/custom-launch', (req, res) => {
  const { name, date, description, rocket } = req.body;
  const newLaunch = { 
    id: Date.now(), 
    name, 
    date, 
    description, 
    rocket,
    created_at: new Date().toISOString()
  };
  spaceData.customLaunches.push(newLaunch);
  res.json(newLaunch);
});

app.post('/api/admin/space-news', (req, res) => {
  const { title, content, author } = req.body;
  const newNews = { 
    id: Date.now(), 
    title, 
    content, 
    author,
    created_at: new Date().toISOString()
  };
  spaceData.spaceNews.push(newNews);
  res.json(newNews);
});

// Enhanced Home Page: NASA APOD + SpaceX Launches
app.get('/', async (req, res) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
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

// Enhanced APOD Page with Gallery
app.get('/apod', async (req, res) => {
  const selectedDate = req.query.date || new Date().toISOString().split('T')[0];
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`;

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
    const apodRes = await fetch(apodUrl);
    const apod = await apodRes.json();

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

// Enhanced Launches Page
app.get('/launches', async (req, res) => {
  const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.render('launches', { launches: data.results, error: null });
  } catch (error) {
    console.error('Error fetching launches:', error);
    res.render('launches', { launches: [], error: 'Error fetching SpaceX launches.' });
  }
});

app.get('/favorites', (req, res) => {
  res.render('favorites');
});

// Admin interface route
app.get('/admin', (req, res) => {
  res.render('admin', { data: spaceData });
});

// Start server only if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Space Science Explorer running at http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`⚙️  Admin interface at http://localhost:${PORT}/admin`);
  });
} else {
  module.exports = app;
}
