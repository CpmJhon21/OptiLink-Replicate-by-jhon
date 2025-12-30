# OptikLink API Documentation

A responsive, single-page API documentation website with a sleek dark theme and neon green accents. Built with React, Express, and Tailwind CSS.

**Live Demo:** https://host.optikl.ink/docs

---

## Features

✨ **33 API Endpoints** across 7 categories:
- AI (Image Generation, Text Processing)
- Downloader (YouTube, Instagram, TikTok)
- Tools (QR Code, Text Tools)
- Music (Search, Download)
- Search (Google, Web)
- Movie (Information, Search)
- Server (Status, Uptime)

🎨 **Design Highlights:**
- Dark theme (#0a0a0a) with neon green accents (#98FF98)
- Fully responsive (Desktop & Mobile)
- Fixed sidebar (Desktop) + Hamburger menu (Mobile)
- Interactive "Test Endpoint" functionality
- Code examples with language switching (cURL, JavaScript, Python, Java)
- Story Generator tool page

📱 **Social Media Links:**
- GitHub: https://github.com/CpmJhon21
- Instagram: @cpm_jhon
- TikTok: @cpm_jhon21
- WhatsApp Channel

---

## Tech Stack

- **Frontend:** React 18, Tailwind CSS, Wouter (Routing)
- **Backend:** Express.js
- **Build Tool:** Vite
- **Package Manager:** npm
- **Deployment:** Vercel / Netlify

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at **http://localhost:5000**

---

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## Deployment

### ✅ No Environment Variables Needed!

This project runs without requiring any environment variables or secrets.

---

### **Option 1: Deploy to Netlify (Recommended)**

#### Via Manual CLI (One-Time Deploy)

```bash
# Step 1: Build the project
npm run build

# Step 2: Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Step 3: Login to Netlify
netlify login

# Step 4: Deploy to production
netlify deploy --prod
```

**Or in one command:**
```bash
npm run build && netlify deploy --prod
```

#### Via GitHub (Auto-Deploy on Every Push)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

2. **Connect Repository to Netlify**
   - Go to https://app.netlify.com
   - Click **"New site from Git"**
   - Select GitHub and authorize
   - Choose your repository
   
3. **Configure Build Settings**
   
   Fill in these fields in Netlify dashboard:
   
   | Setting | Value |
   |---------|-------|
   | **Base directory** | `/` or leave empty |
   | **Build command** | `npm run build` |
   | **Publish directory** | `dist/public` |
   | **Functions directory** | `dist` (optional) |
   
4. Click **Deploy**

✅ Done! Netlify will auto-deploy on every push to main branch.

---

## Understanding Netlify Build Settings

### **Base directory** 📁
- Where to find your code (root folder by default)
- Leave **empty** or use `/`
- Only change if your code is in a subfolder (e.g., if all code is in `backend/` folder)

### **Build command** ⚙️
- Command that builds project for production
- **For this project:** `npm run build`
- Netlify runs this to create the production files

### **Publish directory** 📤
- Folder with final website files (HTML, CSS, JS)
- **For this project:** `dist/public`
- Netlify uploads everything in this folder to the web

### **Functions directory** 🔧
- Folder with serverless functions (backend API)
- **For this project:** `dist` (optional)
- Leave empty if not using Netlify Functions

**Example of filled Netlify form:**
```
Base directory:        [empty or /]
Build command:         [npm run build]
Publish directory:     [dist/public]
Functions directory:   [dist]
```

---

### **Option 2: Deploy to Vercel**

#### Via Manual CLI (One-Time Deploy)

```bash
# Step 1: Install Vercel CLI (if not already installed)
npm install -g vercel

# Step 2: Login to Vercel
vercel login

# Step 3: Deploy to production
vercel --prod
```

**Or in one command:**
```bash
npm install -g vercel && vercel login && vercel --prod
```

**Output Example:**
```
🔗  Linked to your-username/your-project-name (created .vercel)
🔍  Inspect: https://vercel.com/your-username/your-project-name/...
✅ Production: https://your-project-name.vercel.app
```

✅ Done! Your site is live at the URL shown above!

#### Via GitHub (Auto-Deploy on Every Push)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect Repository to Vercel**
   - Go to https://vercel.com
   - Click **"New Project"**
   - Select GitHub and authorize
   - Choose your repository
   
3. **Configure Build Settings**
   
   Vercel will auto-detect, but here are the correct values:
   
   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `.` or leave empty |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   
4. Click **Deploy**

✅ Done! Vercel will auto-deploy on every push to main branch.

---

## Understanding Vercel Build Settings

### **Root Directory** 📁
- Where to find your code (root folder by default)
- Leave **empty** or use `.`
- Only change if your code is in a subfolder (e.g., `apps/my-app`)

### **Build Command** ⚙️
- Command that builds project for production
- **For this project:** `npm run build`
- Vercel runs this to create the production files

### **Output Directory** 📤
- Folder with final website files (HTML, CSS, JS)
- **For this project:** `dist`
- Vercel serves everything in this folder on the web

**Example of filled Vercel form:**
```
Root Directory:        [. or leave empty]
Build Command:         [npm run build]
Output Directory:      [dist]
```

---

## Quick Deploy Comparison

| Platform | Method | Command | Speed |
|----------|--------|---------|-------|
| **Netlify** | Manual CLI | `npm run build && netlify deploy --prod` | ~2-3 min |
| **Vercel** | Manual CLI | `vercel --prod` | ~1-2 min |
| Both | GitHub Auto | Push code → Auto deploy | Instant |

---

## Project Structure

```
.
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # UI components
│   │   ├── lib/          # Utilities & data
│   │   └── App.tsx       # Main app component
│   └── index.html        # HTML entry point
├── server/                # Backend (Express)
│   ├── index.ts          # Express server
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/                # Shared types & schemas
│   └── schema.ts         # Data models
├── netlify.toml          # Netlify config
├── vercel.json           # Vercel config
└── package.json          # Dependencies
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (frontend + backend)

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm run check            # TypeScript type checking
npm run db:push          # Database migrations (if using DB)
```

---

## Customization

### Change Social Links
Edit `client/src/pages/Docs.tsx`:
```javascript
// Update GitHub, Instagram, TikTok, WhatsApp URLs
```

### Add/Modify API Endpoints
Edit `client/src/lib/api-data.ts` to add or update endpoints.

### Change Theme Colors
Edit `client/src/index.css` for color variables and Tailwind config.

---

## Troubleshooting

### Netlify Deploy Error
- Ensure `netlify.toml` exists in root directory ✓
- Run `npm run build` locally first to catch errors
- Check build logs in Netlify dashboard

### Port Already in Use
Change the port in `server/index.ts` or kill the process using port 5000.

---

## License

MIT

---

## Support

For questions or issues:
- GitHub Issues: https://github.com/CpmJhon21/your-repo
- Instagram DM: @cpm_jhon
- WhatsApp: [WhatsApp Channel](https://whatsapp.com/channel/0029VaLiUSS5q08hPj5mcH0m)

---

**Made with ❤️ by OptikLink**
