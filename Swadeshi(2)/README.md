# Swadeshi Heritage Platform

A comprehensive platform for preserving and celebrating India's rich cultural heritage - "Swadeshi for Atmanirbhar Bharat - Heritage & Culture"

## 🚀 Features

- **Explore Heritage**: Browse through thousands of heritage sites, monuments, festivals, and traditions
- **Category-based Discovery**: Organized by categories like Monuments, Festivals, Traditions, Arts, etc.
- **User Contributions**: Community-driven content where users can contribute heritage information
- **Search & Filter**: Advanced search and filtering by category, state, and keywords
- **User Authentication**: Secure user registration and login system
- **Favorites & Likes**: Save favorite heritage items and like content
- **Admin Dashboard**: Content moderation and management system
- **Responsive Design**: Beautiful, modern UI that works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- Axios (API calls)
- React Hot Toast (notifications)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (password hashing)
- Express Validator
- Helmet (security)
- Rate Limiting

## 📦 Installation

1. **Install root dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

4. **Configure environment variables:**

Create `backend/.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🚀 Running the Application

### Development Mode (Runs both frontend and backend):
```bash
npm run dev
```

### Or run separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
swadeshi-heritage-platform/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── context/     # Context providers
│       └── utils/       # Utility functions
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Heritage
- `GET /api/heritage` - Get all heritage items (with filters)
- `GET /api/heritage/:id` - Get single heritage item
- `POST /api/heritage` - Create new heritage item
- `PUT /api/heritage/:id` - Update heritage item
- `DELETE /api/heritage/:id` - Delete heritage item
- `POST /api/heritage/:id/like` - Like/Unlike heritage item

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/favorites/:heritageId` - Add/Remove favorite

## 🎨 Features in Detail

### Home Page
- Hero section with call-to-action
- Category showcase
- Featured heritage items
- Trending heritage
- Statistics section

### Heritage Exploration
- Grid/list view of heritage items
- Search functionality
- Filter by category and state
- Pagination
- Detailed heritage pages

### User Features
- User registration and login
- Profile management
- Contribution system
- Favorites collection
- Like/unlike functionality

### Admin Features
- Content moderation
- Approve/reject contributions
- Category management

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet.js security headers
- Input validation
- Protected routes

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License

## 🙏 Acknowledgments

Built with ❤️ for Atmanirbhar Bharat

