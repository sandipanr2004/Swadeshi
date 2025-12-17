# Setup Guide - Swadeshi Heritage Platform

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

The MongoDB connection is already configured in `backend/server.js` with your provided connection string. However, for production, create a `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://Sandipan_Roy:Sandipan2004@cluster0.k7ludco.mongodb.net/swadeshi_heritage?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### 3. Seed Initial Categories

```bash
cd backend
npm run seed
```

This will populate the database with initial categories:
- Monuments 🏛️
- Festivals 🎉
- Traditions 🙏
- Arts & Crafts 🎨
- Music & Dance 🎵
- Cuisine 🍛
- Literature 📚
- Religious Sites 🕉️

### 4. Start the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Creating Your First Admin User

To create an admin user, you can use MongoDB Compass or MongoDB Shell:

1. Connect to your MongoDB cluster
2. Navigate to the `swadeshi_heritage` database
3. Find the `users` collection
4. Update a user document and set `role: "admin"`

Or use this MongoDB shell command:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Project Structure

```
swadeshi-heritage-platform/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Heritage.js
│   │   └── Category.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── heritage.js
│   │   ├── categories.js
│   │   └── users.js
│   ├── middleware/          # Auth middleware
│   │   └── auth.js
│   ├── scripts/             # Utility scripts
│   │   └── seedCategories.js
│   └── server.js            # Express server
├── frontend/
│   ├── public/              # Static files
│   └── src/
│       ├── components/      # Reusable components
│       │   ├── Layout/
│       │   ├── Heritage/
│       │   ├── Category/
│       │   └── Auth/
│       ├── pages/           # Page components
│       ├── context/         # React Context
│       └── utils/           # Utilities
└── README.md
```

## Features

✅ User Authentication (Register/Login)
✅ Heritage Item Management (CRUD)
✅ Category System
✅ Search & Filter
✅ Like/Favorite System
✅ Admin Dashboard
✅ Responsive Design
✅ Modern UI with Animations

## Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database name is correct (`swadeshi_heritage`)

### Port Already in Use
- Change the PORT in backend/.env or server.js
- Update the proxy in frontend/package.json if needed

### CORS Issues
- CORS is enabled for all origins in development
- For production, update CORS settings in backend/server.js

## Next Steps

1. Seed categories: `cd backend && npm run seed`
2. Create an account via the frontend
3. Make yourself admin (see above)
4. Start contributing heritage items!

## Support

For issues or questions, please check the README.md or create an issue in the repository.

