# 🚀 Thin Air - Developer Deployment Package

## 📦 What You're Getting

This is a complete, production-ready AI application builder with:
- ✅ All 5 phases (Vapour → Manifest)
- ✅ Real AI integration (Gemini 2.0 Flash Thinking + Flash)
- ✅ Marketing website
- ✅ Admin dashboard
- ✅ Production infrastructure (rate limiting, caching, analytics)

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install pnpm (if not installed)
npm install -g pnpm

# Install all dependencies
cd thin-air
pnpm install
```

### Step 2: Set Up Database

**Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (Windows)
# Download from: https://www.postgresql.org/download/windows/

# Create database
psql -U postgres
CREATE DATABASE thinair;
\q

# Add to .env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/thinair
```

**Option B: Free Cloud Database (Recommended)**

```bash
# Use Neon (free tier)
# 1. Go to: https://neon.tech
# 2. Create account
# 3. Create database
# 4. Copy connection string to .env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/thinair
```

### Step 3: Environment Variables

Create `.env` file in root directory:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/thinair

# AI APIs
GEMINI_API_KEY=your-gemini-key-here
# Get from: https://makersuite.google.com/app/apikey

# Redis (Upstash - Free)
UPSTASH_REDIS_URL=your-redis-url
UPSTASH_REDIS_TOKEN=your-redis-token
# Get from: https://upstash.com (free tier)

# Analytics (Optional)
NEXT_PUBLIC_SITE_DOMAIN=thinair.com.au

# Authentication (Optional - for admin dashboard)
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3002
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Step 4: Push Database Schema

```bash
pnpm db:push
```

### Step 5: Start All Apps

```bash
# Start everything
pnpm dev

# Or start individually:
cd apps/marketing && npm run dev  # Port 3002 (marketing + admin)
cd apps/web && npm run dev         # Port 5173 (5-phase app)
cd apps/server && npm run dev      # Port 4000 (API)
```

### Step 6: Access the Apps

- **Web App (5 Phases):** http://localhost:5173
- **Marketing Site:** http://localhost:3002
- **Admin Dashboard:** http://localhost:3002/admin
- **API:** http://localhost:4000

---

## 🌐 Deployment to Production

### Option 1: Vercel (Recommended - Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy marketing site
cd apps/marketing
vercel --prod

# Deploy web app
cd apps/web
vercel --prod

# Deploy API server
cd apps/server
vercel --prod
```

**Environment Variables in Vercel:**
1. Go to Vercel dashboard
2. Select project
3. Settings → Environment Variables
4. Add all variables from `.env`

---

### Option 2: Digital Pacific VPS (Full Control)

**Server Requirements:**
- CPU: 4 vCPUs
- RAM: 8GB
- Storage: 100GB SSD
- OS: Ubuntu 22.04 LTS
- Cost: ~$50/month

**Quick Deploy Script:**

```bash
#!/bin/bash
# Run this on your VPS

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install pnpm & PM2
npm install -g pnpm pm2

# Install Nginx
apt install nginx certbot python3-certbot-nginx -y

# Clone repository
cd /opt
git clone https://github.com/yourusername/thin-air.git
cd thin-air

# Setup databases (Docker)
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: thinair
      POSTGRES_USER: thinair
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  postgres-data:
  redis-data:
EOF

docker-compose up -d

# Install dependencies
pnpm install

# Build apps
pnpm build

# Run migrations
pnpm db:push

# Start with PM2
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'thin-air-marketing',
      cwd: '/opt/thin-air/apps/marketing',
      script: 'npm',
      args: 'start',
      env: { PORT: 3002, NODE_ENV: 'production' }
    },
    {
      name: 'thin-air-server',
      cwd: '/opt/thin-air/apps/server',
      script: 'npm',
      args: 'start',
      env: { PORT: 4000, NODE_ENV: 'production' }
    },
    {
      name: 'thin-air-web',
      cwd: '/opt/thin-air/apps/web',
      script: 'npm',
      args: 'run preview',
      env: { PORT: 5173, NODE_ENV: 'production' }
    }
  ]
}
EOF

pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configure Nginx
cat > /etc/nginx/sites-available/thinair << 'EOF'
server {
    listen 80;
    server_name thinair.com.au www.thinair.com.au;
    
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name app.thinair.com.au;
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.thinair.com.au;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/thinair /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Get SSL certificates
certbot --nginx -d thinair.com.au -d www.thinair.com.au
certbot --nginx -d app.thinair.com.au
certbot --nginx -d api.thinair.com.au

# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

echo "Deployment complete!"
```

---

## 🔑 Getting API Keys

### 1. Gemini API (Required)

```bash
# Free tier: 60 requests/minute
# 1. Go to: https://makersuite.google.com/app/apikey
# 2. Sign in with Google
# 3. Click "Create API Key"
# 4. Copy key to .env as GEMINI_API_KEY
```

### 2. Upstash Redis (Required)

```bash
# Free tier: 10,000 commands/day
# 1. Go to: https://upstash.com
# 2. Create account
# 3. Create Redis database
# 4. Copy REST URL and token to .env
```

### 3. Google OAuth (Optional - for admin login)

```bash
# 1. Go to: https://console.cloud.google.com
# 2. Create new project
# 3. Enable Google+ API
# 4. Create OAuth 2.0 credentials
# 5. Add authorized redirect: http://localhost:3002/api/auth/callback/google
# 6. Copy Client ID and Secret to .env
```

---

## 📁 Project Structure

```
thin-air/
├── apps/
│   ├── marketing/          # Next.js marketing site + admin
│   │   ├── app/           # Pages (home, pricing, admin, etc.)
│   │   ├── components/    # React components
│   │   └── public/        # Static assets
│   │
│   ├── web/               # Vite React app (5 phases)
│   │   ├── src/
│   │   │   ├── pages/    # VaporPage, CondenserPage, etc.
│   │   │   ├── components/
│   │   │   └── utils/
│   │   └── index.html
│   │
│   └── server/            # tRPC API server
│       ├── src/
│       │   ├── routers/  # API routes
│       │   ├── lib/      # AI, rate limiting, etc.
│       │   └── index.ts
│       └── package.json
│
├── packages/
│   └── db/                # Drizzle ORM + PostgreSQL
│       ├── src/
│       │   ├── schema.ts # Database schema
│       │   └── index.ts
│       └── package.json
│
├── docs/                  # All documentation
│   ├── complete-developer-guide.md
│   ├── all-exceptional-features.md
│   ├── domain-and-custom-ai-guide.md
│   └── million-dollar-roadmap.md
│
├── .env                   # Environment variables
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # Monorepo config
└── turbo.json             # Turbo build config
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3002
netstat -ano | findstr :5173
netstat -ano | findstr :4000

# Kill process
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3002 | xargs kill -9
lsof -ti:5173 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Database Connection Failed

```bash
# Check DATABASE_URL in .env
# Make sure PostgreSQL is running
# Test connection:
psql $DATABASE_URL

# Push schema again
pnpm db:push
```

### AI API Not Working

```bash
# Check API keys in .env
echo $GEMINI_API_KEY

# Test Gemini API
curl https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_KEY \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install

# Rebuild
pnpm build
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable HTTPS (SSL certificates)
- [ ] Set up firewall (UFW)
- [ ] Configure rate limiting
- [ ] Enable CORS properly
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

---

## 📊 Monitoring

### Uptime Kuma (Free, Open-Source)

```bash
docker run -d \
  --name=uptime-kuma \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --restart=always \
  louislam/uptime-kuma:1

# Access: http://your-server:3001
```

### Database Backups

```bash
# Create backup script
cat > /opt/thin-air/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec thin-air-db pg_dump -U thinair thinair > /opt/backups/db_$DATE.sql
find /opt/backups -name "db_*.sql" -mtime +7 -delete
EOF

chmod +x /opt/thin-air/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /opt/thin-air/backup.sh
```

---

## 📚 Documentation

All guides are in `/docs`:

1. **complete-developer-guide.md** - Full technical guide
2. **all-exceptional-features.md** - 10 features to $12M ARR
3. **domain-and-custom-ai-guide.md** - Free domain + custom AI
4. **million-dollar-roadmap.md** - Business scaling plan
5. **open-source-tools-guide.md** - All tools used

---

## 🆘 Support

**Issues:** Create GitHub issue
**Email:** dev@thinair.com.au
**Docs:** Check `/docs` folder

---

## ✅ Post-Deployment Checklist

- [ ] All 3 apps running (marketing, web, server)
- [ ] Database connected and migrated
- [ ] API keys configured
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Backups automated
- [ ] Monitoring set up
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Test all 5 phases working

---

## 🚀 You're Ready!

**Local Development:**
- Web App: http://localhost:5173
- Marketing: http://localhost:3002
- Admin: http://localhost:3002/admin

**Production:**
- Web App: https://app.thinair.com.au
- Marketing: https://thinair.com.au
- Admin: https://thinair.com.au/admin

**Start creating apps!** 🎉
