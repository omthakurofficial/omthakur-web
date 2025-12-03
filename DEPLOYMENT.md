# Om Thakur Personal Website - Deployment Guide

## 🚀 Production Deployment

This guide covers deploying the Om Thakur personal website to production with full SEO optimization and performance monitoring.

## 📋 Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- Domain name with SSL certificate
- CDN setup (Cloudinary/AWS S3)
- Analytics accounts (Google Analytics, Search Console)

## 🛠️ Environment Setup

### 1. Environment Variables

Copy the production environment template:
```bash
cp .env.production.example .env.production
```

Fill in all required environment variables:
- Database connection string
- JWT secrets
- API keys for third-party services
- Analytics tracking IDs

### 2. Database Setup

Run database migrations:
```bash
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

### 3. Build Optimization

Install dependencies and build:
```bash
npm ci
npm run build
npm run start
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel login
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Set custom domain
   - Enable analytics

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: AWS/DigitalOcean

1. **Server Setup**
   ```bash
   # Ubuntu 22.04 LTS
   sudo apt update
   sudo apt install nginx nodejs npm postgresql
   
   # Install PM2 for process management
   npm install -g pm2
   ```

2. **Application Deployment**
   ```bash
   git clone https://github.com/your-username/omthakur-website.git
   cd omthakur-website
   npm ci
   npm run build
   pm2 start ecosystem.config.js
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name omthakur.tech www.omthakur.tech;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       listen [::]:443 ssl http2;
       server_name omthakur.tech www.omthakur.tech;

       ssl_certificate /path/to/ssl/cert.pem;
       ssl_certificate_key /path/to/ssl/private.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # Static file caching
       location /_next/static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Image optimization
       location /images/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

### Option 3: Docker Deployment

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
       env_file:
         - .env.production
       depends_on:
         - db
         - redis

     db:
       image: postgres:15
       environment:
         POSTGRES_DB: omthakur_website
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: password
       volumes:
         - postgres_data:/var/lib/postgresql/data

     redis:
       image: redis:7-alpine
       ports:
         - "6379:6379"

   volumes:
     postgres_data:
   ```

## 🔍 SEO Configuration

### 1. Google Search Console

1. Verify domain ownership
2. Submit sitemap: `https://omthakur.tech/sitemap.xml`
3. Monitor crawl status and indexing

### 2. Google Analytics

1. Create GA4 property
2. Add tracking ID to environment variables
3. Configure enhanced ecommerce tracking

### 3. Meta Tags Verification

Verify all pages have proper meta tags:
```bash
# Check homepage
curl -s https://omthakur.tech | grep -i "meta\|title"

# Check blog posts
curl -s https://omthakur.tech/blog/your-post | grep -i "meta\|title"
```

## 📊 Performance Monitoring

### 1. Core Web Vitals

Monitor performance metrics:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### 2. Lighthouse Scores

Run regular audits:
```bash
npm install -g lighthouse
lighthouse https://omthakur.tech --output html --output-path ./lighthouse-report.html
```

### 3. Real User Monitoring

Configure RUM tracking in Google Analytics and monitor:
- Page load times
- User engagement metrics
- Conversion funnels

## 🛡️ Security Checklist

### 1. SSL/TLS Configuration
- [x] Valid SSL certificate
- [x] HTTP to HTTPS redirects
- [x] HSTS headers
- [x] Secure cookie settings

### 2. Headers Configuration
- [x] Content Security Policy
- [x] X-Frame-Options
- [x] X-Content-Type-Options
- [x] X-XSS-Protection

### 3. Dependencies
```bash
# Audit dependencies
npm audit
npm audit fix

# Update packages
npm update
```

## 📈 Post-Deployment Tasks

### 1. Sitemap Submission
- Submit to Google Search Console
- Submit to Bing Webmaster Tools
- Update robots.txt if needed

### 2. Social Media Integration
- Update Open Graph images
- Configure Twitter cards
- Test social media previews

### 3. Performance Testing
```bash
# Load testing
npx artillery run load-test.yml

# Performance monitoring
npx web-vitals-report https://omthakur.tech
```

### 4. Content Migration
- Import existing blog posts
- Upload optimized images
- Set up redirects for old URLs

## 🚨 Monitoring & Alerts

### 1. Uptime Monitoring
- Set up UptimeRobot or similar
- Configure alert notifications
- Monitor response times

### 2. Error Tracking
- Sentry integration for error monitoring
- Log aggregation setup
- Performance regression alerts

### 3. Analytics Alerts
- Traffic drop alerts
- Conversion rate monitoring
- Core Web Vitals alerts

## 🔄 Maintenance

### Regular Tasks
- Weekly dependency updates
- Monthly performance audits
- Quarterly security reviews
- Content backup verification

### Update Process
```bash
# Development
git pull origin main
npm install
npm run build
npm test

# Production
git tag v1.0.1
git push origin v1.0.1
# Deploy through CI/CD pipeline
```

## 📞 Support

For deployment issues or questions:
- Email: support@omthakur.tech
- Documentation: https://docs.omthakur.tech
- Repository: https://github.com/omthakur/omthakur-website

---

**Last Updated:** November 2024
**Version:** 1.0.0