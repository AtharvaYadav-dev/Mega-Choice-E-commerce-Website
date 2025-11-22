# Quick Deployment Steps

## ✅ What's Already Done:
1. Frontend API configuration updated to use environment variables
2. Backend CORS configured for production
3. MongoDB connection string ready
4. GitHub repository updated

## 🚀 Next Steps to Deploy:

### 1. On Vercel (Frontend)
Add this environment variable in your Vercel project settings:
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```
Then redeploy your Vercel project.

### 2. On Render (Backend)
Create a new Web Service with these settings:

**Basic Settings:**
- Repository: `AtharvaYadav-dev/Mega-Choice-E-commerce-Website`
- Root Directory: `e-commerce/server`
- Build Command: `npm install`
- Start Command: `npm start`

**Environment Variables:**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://AtharvaYadav131:db_user_AtharvaYadav00@cluster0.7hjv8ms.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this
CLIENT_URL=https://mega-choice-e-commerce-website.vercel.app
CLIENT_URLS=https://mega-choice-e-commerce-website.vercel.app,https://mega-choice-e-commerce-website-*.vercel.app
CLIENT_URL_REGEX=^https://mega-choice-e-commerce-website.*\.vercel\.app$
```

### 3. Update Vercel with Render URL
Once Render gives you a URL (like `https://mega-choice-backend.onrender.com`):
1. Go to Vercel → Settings → Environment Variables
2. Update `VITE_API_URL` with your Render URL
3. Redeploy

### 4. Seed Production Database
Run this command locally (pointing to production MongoDB):
```bash
cd e-commerce/server
node scripts/seedProducts.js
```

## 📝 Important Notes:
- Your MongoDB connection string is already in the images you shared
- Make sure to whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- Render free tier sleeps after 15 minutes - first request may be slow
- Check DEPLOYMENT.md for detailed instructions

## 🔍 Testing:
1. Visit your Render backend URL + `/api/health`
2. Visit your Render backend URL + `/api/products`
3. Visit your Vercel URL and check the shop page
4. Open browser console (F12) to check for errors

That's it! Your e-commerce site will be live! 🎉
