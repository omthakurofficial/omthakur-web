# 🌟 Om Thakur Personal Website

A modern, fully-featured personal website built with Next.js 15, featuring a blog, photography gallery, video showcase, professional portfolio, and comprehensive admin dashboard with monetization capabilities.

![Om Thakur Website](https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 **Modern Design & User Experience**
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Dark/Light Theme**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation support

### 📝 **Content Management System**
- **Rich Blog System**: Full-featured blog with categories, tags, search, and filtering
- **Photo Gallery**: Masonry layout with lightbox, filtering, and metadata display
- **Video Showcase**: YouTube integration with modal viewing and categorization
- **Portfolio Projects**: Detailed project showcase with technology tags and demos
- **Resume/CV**: Professional resume with downloadable PDF and interactive sections

### 🛠️ **Admin Dashboard**
- **Complete CRUD Operations**: Full content management for all website sections
- **Media Management**: Upload, organize, and optimize images and videos
- **Analytics Dashboard**: Real-time visitor statistics and engagement metrics
- **User Management**: Role-based access control and user administration
- **Content Scheduling**: Schedule blog posts and content updates
- **SEO Tools**: Meta tag management and structured data optimization

### 💰 **Monetization & Advertising**
- **Ad Management System**: Comprehensive ad placement and tracking
- **Multiple Ad Types**: Banner, sidebar, inline, popup, and native ad support
- **Performance Analytics**: Revenue tracking and ad performance metrics
- **Sponsorship Page**: Professional partnership opportunities showcase
- **Targeting Options**: Audience segmentation and geographic targeting

### 🔍 **SEO Optimization**
- **Advanced Meta Tags**: Dynamic meta tags with Open Graph and Twitter Cards
- **Structured Data**: JSON-LD implementation for rich search results
- **XML Sitemap**: Auto-generated sitemap with priority and frequency settings
- **RSS Feed**: Blog content syndication with full-text feeds
- **Performance Optimized**: Core Web Vitals optimization and monitoring

### 📊 **Analytics & Performance**
- **Google Analytics 4**: Enhanced ecommerce and event tracking
- **Core Web Vitals Monitoring**: Real-time performance metrics
- **Error Tracking**: Comprehensive error monitoring and reporting
- **User Behavior Analytics**: Scroll tracking, click heatmaps, and engagement metrics
- **Performance Insights**: Load time monitoring and optimization suggestions

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### **Backend**
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **File Upload**: Cloudinary/AWS S3 integration
- **Caching**: Redis for performance optimization

### **DevOps & Deployment**
- **Hosting**: Vercel (recommended) / AWS / DigitalOcean
- **Domain**: Custom domain with SSL
- **CDN**: Cloudfront/Cloudflare for static assets
- **Monitoring**: Sentry for error tracking
- **CI/CD**: GitHub Actions for automated deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- PostgreSQL database
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/omthakur/omthakur-website.git
   cd omthakur-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
omthakur-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (admin)/           # Admin dashboard routes
│   │   ├── blog/              # Blog system
│   │   ├── photos/            # Photography gallery
│   │   ├── videos/            # Video showcase
│   │   ├── portfolio/         # Project portfolio
│   │   ├── resume/            # Professional resume
│   │   └── sponsorship/       # Partnership opportunities
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components (shadcn/ui)
│   │   ├── layout/           # Layout components
│   │   ├── admin/            # Admin-specific components
│   │   ├── seo/              # SEO optimization components
│   │   ├── analytics/        # Analytics and tracking
│   │   └── ads/              # Advertisement components
│   ├── lib/                  # Utility functions and configurations
│   │   ├── auth.ts           # Authentication helpers
│   │   ├── db.ts             # Database configuration
│   │   ├── seo.ts            # SEO utilities
│   │   └── utils.ts          # General utilities
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Global styles and Tailwind config
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
├── docs/                     # Documentation
└── scripts/                  # Build and deployment scripts
```

## 🎯 Key Features Deep Dive

### **Blog System**
- **Rich Text Editor**: Full WYSIWYG editor with syntax highlighting
- **SEO Optimized**: Automatic meta tags and structured data
- **Social Sharing**: Built-in social media sharing buttons
- **Comment System**: Threaded comments with moderation
- **Reading Time**: Automatic reading time calculation
- **Related Posts**: AI-powered content recommendations

### **Photography Gallery**
- **Masonry Layout**: Pinterest-style responsive grid
- **Lightbox Viewing**: Full-screen image viewing with navigation
- **EXIF Data Display**: Camera settings and technical details
- **Categorization**: Multiple category and tag support
- **Lazy Loading**: Performance-optimized image loading
- **Download Options**: High-resolution download capabilities

### **Admin Dashboard**
- **Intuitive Interface**: Clean, user-friendly admin panel
- **Real-time Statistics**: Live visitor and engagement metrics
- **Content Editor**: Rich text editor with preview functionality
- **Media Library**: Drag-and-drop file management
- **SEO Tools**: Meta tag editor and optimization suggestions
- **User Roles**: Granular permission management

### **Monetization System**
- **Ad Placement Engine**: Intelligent ad positioning algorithm
- **Revenue Tracking**: Detailed earning analytics and reports
- **A/B Testing**: Ad variant testing for optimization
- **Sponsor Management**: Partnership tracking and communication
- **Payment Integration**: Automated billing and invoicing
- **Performance Insights**: Click-through rates and engagement metrics

## 🔧 Configuration

### **Environment Variables**
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/omthakur_website"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Email Service
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Social Media
TWITTER_API_KEY="your-twitter-api-key"
INSTAGRAM_ACCESS_TOKEN="your-instagram-token"
```

### **Customization**
- **Color Scheme**: Modify `tailwind.config.js` for custom branding
- **Typography**: Update font configurations in `src/app/layout.tsx`
- **Layout**: Customize header/footer in `src/components/layout/`
- **Content**: Update personal information in `src/lib/constants.ts`

## 📊 Performance Metrics

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **Core Web Vitals**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Optimization Features**
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Dead code elimination for smaller bundles
- **Compression**: Gzip/Brotli compression for all assets
- **Caching**: Multi-layer caching strategy for optimal performance

## 🔒 Security Features

### **Authentication & Authorization**
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-Based Access**: Granular permission system
- **Session Management**: Secure session handling
- **CSRF Protection**: Cross-site request forgery prevention

### **Security Headers**
- **HSTS**: HTTP Strict Transport Security
- **CSP**: Content Security Policy implementation
- **X-Frame-Options**: Clickjacking protection
- **XSS Protection**: Cross-site scripting prevention
- **MIME Sniffing**: Content type validation

## 🚀 Deployment

### **Production Deployment**
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Run production server**
   ```bash
   npm start
   ```

### **Deployment Platforms**
- **Vercel** (Recommended): One-click deployment with automatic optimization
- **AWS**: EC2, ECS, or Lambda deployment options
- **DigitalOcean**: App Platform or Droplet deployment
- **Netlify**: Static site deployment with serverless functions

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 API Documentation

### **Blog API**
```typescript
GET /api/blog/posts          # Get all blog posts
GET /api/blog/posts/[slug]   # Get specific post
POST /api/blog/posts         # Create new post (admin)
PUT /api/blog/posts/[id]     # Update post (admin)
DELETE /api/blog/posts/[id]  # Delete post (admin)
```

### **Media API**
```typescript
GET /api/media               # Get all media files
POST /api/media/upload       # Upload new file
DELETE /api/media/[id]       # Delete media file
```

### **Analytics API**
```typescript
GET /api/analytics/overview  # Get analytics overview
GET /api/analytics/posts     # Get post analytics
GET /api/analytics/traffic   # Get traffic data
```

## 🧪 Testing

### **Running Tests**
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### **Testing Stack**
- **Unit Testing**: Jest + React Testing Library
- **Integration Testing**: Playwright
- **E2E Testing**: Cypress
- **Performance Testing**: Lighthouse CI
- **Accessibility Testing**: axe-core

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### **Code Standards**
- **TypeScript**: Strict mode with full type coverage
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Support & Contact

### **Get Help**
- **Documentation**: [https://docs.omthakur.tech](https://docs.omthakur.tech)
- **Issues**: [GitHub Issues](https://github.com/omthakur/omthakur-website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/omthakur/omthakur-website/discussions)

### **Connect with Om Thakur**
- **Website**: [https://omthakur.tech](https://omthakur.tech)
- **Email**: [om@omthakur.tech](mailto:om@omthakur.tech)
- **Twitter**: [@omthakur](https://twitter.com/omthakur)
- **LinkedIn**: [/in/omthakur](https://linkedin.com/in/omthakur)
- **GitHub**: [/omthakur](https://github.com/omthakur)

## 🎉 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For seamless deployment and hosting
- **shadcn**: For the beautiful UI component library
- **Tailwind CSS**: For utility-first CSS framework
- **Prisma**: For type-safe database access
- **Open Source Community**: For countless helpful libraries

---

<div align="center">
  <p>Built with ❤️ by <a href="https://omthakur.tech">Om Thakur</a></p>
  <p>⭐ Star this repo if it helped you!</p>
</div>
# omthakur-web
