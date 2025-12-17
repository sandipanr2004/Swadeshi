# 🚀 Quick Start Guide

## Step 1: Install All Dependencies

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

## Step 2: Seed Categories

```bash
cd backend
npm run seed
```

This creates 8 initial categories:
- 🏛️ Monuments
- 🎉 Festivals  
- 🙏 Traditions
- 🎨 Arts & Crafts
- 🎵 Music & Dance
- 🍛 Cuisine
- 📚 Literature
- 🕉️ Religious Sites

## Step 3: Start the Application

**Option A: Run Both Together**
```bash
npm run dev
```

**Option B: Run Separately**

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm start
```

## Step 4: Access the Application

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5000
- ✅ **Health Check**: http://localhost:5000/api/health

## Step 5: Create Your First Account

1. Go to http://localhost:3000/register
2. Create an account
3. Login at http://localhost:3000/login

## Step 6: Make Yourself Admin (Optional)

To access admin features:

1. Connect to MongoDB (MongoDB Compass or Shell)
2. Database: `swadeshi_heritage`
3. Collection: `users`
4. Find your user document
5. Update: `role: "admin"`

Or use MongoDB Shell:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 7: Start Contributing!

1. Click "Contribute" in the navbar
2. Fill out the heritage form
3. Submit your contribution
4. If you're admin, approve it in the Admin Dashboard

## 🎉 You're All Set!

The platform is now ready to use. Explore, contribute, and celebrate India's heritage!

---

**Need Help?** Check `SETUP.md` for detailed setup instructions or `README.md` for full documentation.

