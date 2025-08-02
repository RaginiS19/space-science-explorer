# 🚀 Space Science Explorer

A professional Node.js + Express web application that brings you closer to the cosmos! This app fetches real-time data from NASA's Astronomy Picture of the Day (APOD) API and SpaceX Launch API to display fascinating space imagery and upcoming launches.

## ✨ Features

- **🌌 NASA APOD Gallery**: View NASA's Astronomy Picture of the Day with date selection
- **🚀 SpaceX Launches**: Real-time upcoming launch information with search functionality
- **❤️ Favorites System**: Save your favorite space images using localStorage
- **⚙️ Admin Panel**: Manage custom launches and space news
- **📡 RESTful API**: Complete API endpoints for frontend integration
- **🎨 Modern UI**: Professional design with responsive layout
- **🔒 CORS Enabled**: Ready for cross-origin requests
- **📱 Mobile Responsive**: Optimized for all devices

## 🏗️ Project Structure

```
space-science-explorer/
├── public/                 # Static assets (CSS, images)
│   └── css/
│       └── styles.css     # Professional styling
├── views/                 # EJS templates
│   ├── partials/          # Header & Footer
│   ├── index.ejs          # Home page
│   ├── apod.ejs           # APOD gallery
│   ├── launches.ejs       # Launch listings
│   ├── favorites.ejs      # Saved favorites
│   └── admin.ejs          # Admin interface
├── tests/                 # Jest + Supertest test cases
│   └── app.test.js
├── app.js                 # Main Express app with API endpoints
├── .env                   # Environment variables
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/space-science-explorer.git
cd space-science-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root folder:
```env
NASA_API_KEY=your_nasa_api_key_here
PORT=3000
```

4. **Start the server**
```bash
npm start
```

5. **Access the application**
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- API documentation: http://localhost:3000/api

## 📡 API Endpoints

### Public API
- `GET /api/apod/:date?` - Get APOD for specific date
- `GET /api/launches` - Get upcoming SpaceX launches
- `GET /api/favorites` - Get saved favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Admin API
- `GET /api/admin/data` - Get all admin data
- `POST /api/admin/custom-launch` - Add custom launch
- `POST /api/admin/space-news` - Add space news

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Beautiful space-themed gradients
- **Glass Morphism**: Translucent elements with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Professional Typography**: Inter font family
- **Responsive Grid Layout**: Adaptive design for all screen sizes
- **Interactive Cards**: Hover effects and visual feedback

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Test coverage includes:
- Homepage functionality
- APOD route handling
- Launches data fetching
- API endpoint validation

## 🌐 Deployment

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Run the following commands:

```bash
heroku create your-app-name
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Environment Variables
Set your NASA API key in Heroku:
```bash
heroku config:set NASA_API_KEY=your_nasa_api_key_here
```

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, HTML5, CSS3
- **APIs**: NASA APOD API, SpaceX Launches API
- **Styling**: Custom CSS with modern design principles
- **Testing**: Jest, Supertest
- **Deployment**: Heroku-ready

## 👨‍💻 Author

**Ragini Shirwalkar**
- Web Developer | UX/UI Designer
- Specializing in modern web applications
- Passionate about space science and technology

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for space exploration enthusiasts**





