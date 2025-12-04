# Backend Database Testing Guide

## Database Options for High Traffic Websites

### 1. **Supabase (Recommended)**
- **Free Tier**: 500MB database, 2GB bandwidth/month
- **Pros**: Built-in auth, real-time, file storage, edge functions
- **Best for**: Full-stack apps, real-time features
- **Setup**: 
  1. Go to supabase.com → New Project
  2. Copy DATABASE_URL from Settings → Database
  3. Copy API keys from Settings → API

### 2. **PlanetScale (MySQL)**
- **Free Tier**: 1 database, 1GB storage, 1 billion reads/month
- **Pros**: Serverless MySQL, branching workflow
- **Best for**: MySQL-based apps, high read traffic
- **Setup**:
  ```bash
  npm install @planetscale/database
  ```

### 3. **Railway PostgreSQL**
- **Free Tier**: $5/month credit, usage-based
- **Pros**: Simple deployment, built-in monitoring
- **Best for**: Simple PostgreSQL needs

### 4. **Neon (PostgreSQL)**
- **Free Tier**: 3GB storage, compute included
- **Pros**: Serverless PostgreSQL, auto-scaling
- **Best for**: PostgreSQL with auto-scaling

## Testing Your Backend APIs

### Test Commands:
```bash
# Test blog API
curl http://localhost:3000/api/blog

# Test with pagination
curl "http://localhost:3000/api/blog?page=1&limit=5"

# Test photos API
curl http://localhost:3000/api/photos

# Test videos API
curl http://localhost:3000/api/videos
```

### Using Browser DevTools:
1. Open your website in browser
2. Press F12 → Network tab
3. Navigate to different pages
4. Check API calls and responses

### Database Performance Testing:
```bash
# Install database testing tools
npm install --save-dev @types/node artillery

# Create load test
npx artillery quick --count 10 --num 5 http://localhost:3000/api/blog
```