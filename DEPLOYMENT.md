# Deployment Guide

## Overview
This guide will help you deploy your E-commerce website with:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 1. MongoDB Atlas Setup ✅

You've already set this up! Your connection string is:
```
mongodb+srv://<username>:<password>@cluster0.7hjv8ms.mongodb.net/?appName=Cluster0
```

**Important**: Make sure to:
- Replace `<username>` and `<password>` with your actual credentials
- Whitelist all IP addresses (0.0.0.0/0) in Network Access for production

---

## 2. Backend Deployment on Render

### Step 1: Create Web Service on Render
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `AtharvaYadav-dev/Mega-Choice-E-commerce-Website`
4. Configure the service:
   - **Name**: `mega-choice-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `e-commerce/server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### Step 2: Add Environment Variables on Render
Go to "Environment" tab and add these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://AtharvaYadav131:db_user_AtharvaYadav00@cluster0.7hjv8ms.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=https://mega-choice-e-commerce-website.vercel.app
CLIENT_URLS=https://mega-choice-e-commerce-website.vercel.app,https://mega-choice-e-commerce-website-*.vercel.app
CLIENT_URL_REGEX=^https://mega-choice-e-commerce-website.*\.vercel\.app$
```

**Note**: Replace the Vercel URL with your actual Vercel deployment URL.

### Step 3: Deploy
Click "Create Web Service" and wait for deployment to complete.

Your backend URL will be something like:
```
https://mega-choice-backend.onrender.com
```

---

## 3. Frontend Deployment on Vercel ✅

You've already deployed to Vercel! Now update the environment variables:

### Step 1: Add Environment Variable on Vercel
1. Go to your Vercel project settings
2. Navigate to "Settings" → "Environment Variables"
3. Add this variable:

```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

**Replace** `your-render-backend-url` with your actual Render backend URL.

### Step 2: Redeploy
After adding the environment variable, trigger a new deployment:
- Go to "Deployments" tab
- Click the three dots on the latest deployment
- Click "Redeploy"

---

## 4. Verification Checklist

### Backend (Render)
- [ ] Service is deployed and running
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] Health endpoint works: `https://your-backend.onrender.com/api/health`
- [ ] Products endpoint works: `https://your-backend.onrender.com/api/products`

### Frontend (Vercel)
- [ ] Site is deployed and accessible
- [ ] VITE_API_URL environment variable is set
- [ ] Shop page loads products from backend
- [ ] Filters work correctly
- [ ] No CORS errors in browser console

### Database (MongoDB Atlas)
- [ ] Connection string is correct
- [ ] Network access allows all IPs (0.0.0.0/0)
- [ ] Database user has read/write permissions
- [ ] Products collection has 500 products

---

## 5. Testing Your Deployment

### Test Backend API
Open these URLs in your browser:

1. **Health Check**:
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return: `{"status":"ok","env":"production"}`

2. **Products List**:
   ```
   https://your-backend.onrender.com/api/products
   ```
   Should return JSON array of products

### Test Frontend
1. Visit your Vercel URL
2. Navigate to `/shop` page
3. Check browser console for errors (F12)
4. Verify products are loading
5. Test filters (gender, brand, size, etc.)

---

## 6. Common Issues & Solutions

### Issue: CORS Error
**Solution**: Make sure your Render backend has the correct CLIENT_URL environment variables set to your Vercel domain.

### Issue: Products Not Loading
**Solution**: 
1. Check VITE_API_URL is set correctly in Vercel
2. Verify backend is running on Render
3. Check browser console for API errors

### Issue: MongoDB Connection Failed
**Solution**:
1. Verify MONGODB_URI is correct
2. Check MongoDB Atlas Network Access allows all IPs
3. Ensure database user credentials are correct

### Issue: Render Free Tier Sleeps
**Solution**: Free tier on Render sleeps after 15 minutes of inactivity. First request may take 30-60 seconds to wake up. Consider upgrading to paid tier for production.

---

## 7. Seeding Production Database

To add products to your production database:

1. **Option A**: Use MongoDB Compass
   - Connect to your MongoDB Atlas cluster
   - Run the seed script locally pointing to production DB

2. **Option B**: Add seed script to Render
   - SSH into Render or use their shell
   - Run: `node scripts/seedProducts.js`

---

## 8. Environment Variables Summary

### Backend (Render)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
CLIENT_URL=<your-vercel-url>
CLIENT_URLS=<your-vercel-url>,<preview-urls>
CLIENT_URL_REGEX=^https://your-project.*\.vercel\.app$
```

### Frontend (Vercel)
```env
VITE_API_URL=<your-render-backend-url>
```

---

## 9. Next Steps

1. ✅ Update Render environment variables with your Vercel URL
2. ✅ Update Vercel environment variables with your Render backend URL
3. ✅ Seed production database with products
4. ✅ Test the complete flow
5. ✅ Monitor logs for any errors

---

## Support

If you encounter any issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
3. Check MongoDB Atlas logs: Atlas → Cluster → Metrics

---

**Good luck with your deployment! 🚀**
