import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'om@thakur.com' },
    update: {},
    create: {
      id: 'admin-user-id',
      email: 'om@thakur.com',
      username: 'omthakur',
      password: adminPassword,
      name: 'Om Thakur',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create categories
  const devOpsCategory = await prisma.category.upsert({
    where: { slug: 'devops' },
    update: {},
    create: {
      name: 'DevOps',
      slug: 'devops',
      description: 'DevOps practices, CI/CD, and automation',
      color: '#10B981'
    }
  })

  const cloudCategory = await prisma.category.upsert({
    where: { slug: 'cloud-computing' },
    update: {},
    create: {
      name: 'Cloud Computing',
      slug: 'cloud-computing',
      description: 'AWS, Azure, and cloud architecture',
      color: '#3B82F6'
    }
  })

  const tutorialsCategory = await prisma.category.upsert({
    where: { slug: 'tutorials' },
    update: {},
    create: {
      name: 'Tutorials',
      slug: 'tutorials',
      description: 'Step-by-step guides and tutorials',
      color: '#F59E0B'
    }
  })

  console.log('✅ Created categories')

  // Create tags
  const tags = [
    { name: 'AWS', slug: 'aws', color: '#FF9900' },
    { name: 'Docker', slug: 'docker', color: '#2496ED' },
    { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
    { name: 'CI/CD', slug: 'cicd', color: '#22C55E' },
    { name: 'Terraform', slug: 'terraform', color: '#623CE4' },
    { name: 'Linux', slug: 'linux', color: '#FCC419' },
    { name: 'React', slug: 'react', color: '#61DAFB' },
    { name: 'Next.js', slug: 'nextjs', color: '#000000' }
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag
    })
  }

  console.log('✅ Created tags')

  // Create sample blog posts
  const posts = [
    {
      title: 'Complete Guide to AWS EKS: From Setup to Production',
      slug: 'complete-guide-aws-eks',
      content: `# Complete Guide to AWS EKS

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that makes it easy to run Kubernetes on AWS without needing to install and operate your own Kubernetes control plane.

## What is AWS EKS?

AWS EKS is a managed service that eliminates the need to install, operate, and maintain your own Kubernetes control plane on AWS. It provides:

- **Managed Control Plane**: AWS manages the Kubernetes control plane across multiple AZs
- **High Availability**: Built-in redundancy and automatic failover
- **Security**: Integration with AWS IAM, VPC, and other security services
- **Scalability**: Auto-scaling capabilities for both nodes and pods

## Setting Up Your First EKS Cluster

### Prerequisites

Before you begin, make sure you have:

1. AWS CLI configured
2. kubectl installed
3. eksctl CLI tool
4. Proper IAM permissions

### Step 1: Create the Cluster

\`\`\`bash
eksctl create cluster \\
  --name my-cluster \\
  --version 1.24 \\
  --region us-west-2 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3 \\
  --nodes-min 1 \\
  --nodes-max 4 \\
  --managed
\`\`\`

This command creates a new EKS cluster with managed node groups.

### Step 2: Configure kubectl

\`\`\`bash
aws eks update-kubeconfig --region us-west-2 --name my-cluster
\`\`\`

### Step 3: Verify the Installation

\`\`\`bash
kubectl get nodes
kubectl get pods --all-namespaces
\`\`\`

## Best Practices for Production

### 1. Security Considerations

- Use IAM roles for service accounts (IRSA)
- Enable cluster logging
- Use private endpoints when possible
- Implement pod security policies

### 2. Networking

- Use VPC CNI for optimal performance
- Configure proper security groups
- Use Application Load Balancer Controller

### 3. Monitoring and Observability

- Deploy CloudWatch Container Insights
- Use AWS X-Ray for distributed tracing
- Implement Prometheus and Grafana

## Conclusion

AWS EKS provides a robust platform for running containerized applications at scale. By following these best practices, you can ensure your EKS cluster is secure, scalable, and production-ready.`,
      excerpt: 'Learn how to set up and manage a production-ready Kubernetes cluster on AWS EKS with best practices and security considerations.',
      coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      published: true,
      featured: true,
      readingTime: 8,
      publishedAt: new Date('2024-11-20'),
      metaTitle: 'Complete AWS EKS Guide - Setup to Production | Om Thakur',
      metaDescription: 'Learn how to set up and manage a production-ready Kubernetes cluster on AWS EKS with best practices, security considerations, and step-by-step instructions.',
      metaKeywords: 'AWS EKS, Kubernetes, DevOps, Cloud Computing, Container Orchestration',
      authorId: adminUser.id,
      categoryId: cloudCategory.id
    },
    {
      title: 'Docker Multi-Stage Builds: Optimize Your Container Images',
      slug: 'docker-multi-stage-builds',
      content: `# Docker Multi-Stage Builds: Optimize Your Container Images

Multi-stage builds are a powerful Docker feature that helps you create smaller, more secure container images by allowing you to use multiple FROM statements in your Dockerfile.

## Why Use Multi-Stage Builds?

Traditional Dockerfile approaches often result in large images containing build tools, dependencies, and artifacts that aren't needed in production. Multi-stage builds solve this by:

- **Reducing Image Size**: Only include necessary runtime dependencies
- **Improving Security**: Fewer components mean smaller attack surface
- **Separating Concerns**: Build and runtime environments can be different

## Basic Multi-Stage Example

Here's a simple example with a Node.js application:

\`\`\`dockerfile
# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Advanced Patterns

### Go Application Example

\`\`\`dockerfile
# Build stage
FROM golang:1.19-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .

CMD ["./main"]
\`\`\`

### React Application

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## Best Practices

### 1. Order Your Stages Efficiently

Place frequently changing layers last to maximize cache utilization.

### 2. Use Specific Tags

Always use specific version tags instead of \`latest\`.

### 3. Minimize Layer Count

Combine RUN commands where possible to reduce layer count.

### 4. Use .dockerignore

Exclude unnecessary files to speed up builds.

\`\`\`
node_modules
.git
.gitignore
README.md
.env
.nyc_output
coverage
.coverage
\`\`\`

## Security Considerations

### Use Distroless Images

For even smaller and more secure images, consider distroless base images:

\`\`\`dockerfile
FROM golang:1.19-alpine AS builder
# ... build steps ...

FROM gcr.io/distroless/static-debian11
COPY --from=builder /app/main /main
ENTRYPOINT ["/main"]
\`\`\`

### Scan for Vulnerabilities

Always scan your images for security vulnerabilities:

\`\`\`bash
docker scan your-image:tag
\`\`\`

## Conclusion

Multi-stage builds are essential for creating efficient, secure Docker images. They allow you to separate build and runtime concerns while keeping your production images minimal and secure.`,
      excerpt: 'Discover how to create smaller, more secure Docker images using multi-stage builds and advanced optimization techniques.',
      coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800',
      published: true,
      featured: true,
      readingTime: 6,
      publishedAt: new Date('2024-11-18'),
      metaTitle: 'Docker Multi-Stage Builds Optimization Guide | Om Thakur',
      metaDescription: 'Learn how to optimize Docker images using multi-stage builds. Reduce image size, improve security, and follow best practices.',
      authorId: adminUser.id,
      categoryId: devOpsCategory.id
    },
    {
      title: 'CI/CD Best Practices with GitHub Actions',
      slug: 'cicd-github-actions',
      content: `# CI/CD Best Practices with GitHub Actions

GitHub Actions has revolutionized how we implement CI/CD pipelines. This comprehensive guide covers best practices for building robust, secure, and efficient workflows.

## Getting Started with GitHub Actions

### Basic Workflow Structure

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
\`\`\`

## Security Best Practices

### 1. Use Secrets for Sensitive Data

Never hardcode sensitive information in your workflows:

\`\`\`yaml
- name: Deploy to AWS
  env:
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
  run: |
    aws s3 sync ./build s3://my-bucket
\`\`\`

### 2. Pin Action Versions

Always pin actions to specific versions or commit SHA:

\`\`\`yaml
# Good
- uses: actions/checkout@v3.5.3
# Or even better
- uses: actions/checkout@c85c95e3d7251135ab7dc9ce3241c5835cc595a9
\`\`\`

### 3. Use Dependabot for Updates

Keep your actions up-to-date with Dependabot:

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
\`\`\`

## Performance Optimization

### 1. Cache Dependencies

Speed up builds by caching dependencies:

\`\`\`yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-
\`\`\`

### 2. Parallel Jobs

Run independent tasks in parallel:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    # ... test steps

  lint:
    runs-on: ubuntu-latest
    # ... lint steps

  build:
    runs-on: ubuntu-latest
    needs: [test, lint]
    # ... build steps
\`\`\`

### 3. Matrix Builds

Test across multiple environments:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
\`\`\`

## Advanced Patterns

### 1. Reusable Workflows

Create reusable workflows for common patterns:

\`\`\`yaml
# .github/workflows/reusable-deploy.yml
name: Deploy Application
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v3
      # ... deployment steps
\`\`\`

### 2. Custom Actions

Build custom actions for complex logic:

\`\`\`yaml
# action.yml
name: 'Custom Deploy Action'
description: 'Deploy application with custom logic'
inputs:
  environment:
    description: 'Target environment'
    required: true
runs:
  using: 'node20'
  main: 'dist/index.js'
\`\`\`

### 3. Conditional Deployments

Deploy only when necessary:

\`\`\`yaml
deploy:
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  needs: [test, build]
  runs-on: ubuntu-latest
  steps:
    # ... deployment steps
\`\`\`

## Monitoring and Observability

### 1. Workflow Status Badges

Add status badges to your README:

\`\`\`markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
\`\`\`

### 2. Slack Notifications

Notify your team of build status:

\`\`\`yaml
- name: Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: \${{ job.status }}
    webhook_url: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

### 3. Artifact Collection

Store build artifacts and test results:

\`\`\`yaml
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: test-results/
\`\`\`

## Conclusion

GitHub Actions provides a powerful platform for implementing CI/CD. By following these best practices, you can create secure, efficient, and maintainable workflows that scale with your project.

Remember to regularly review and update your workflows as your project evolves and new best practices emerge.`,
      excerpt: 'Build robust CI/CD pipelines using GitHub Actions with advanced workflows, security scanning, and deployment strategies.',
      coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
      published: true,
      featured: true,
      readingTime: 10,
      publishedAt: new Date('2024-11-15'),
      metaTitle: 'GitHub Actions CI/CD Best Practices Guide | Om Thakur',
      metaDescription: 'Learn CI/CD best practices with GitHub Actions. Build secure, efficient workflows with advanced patterns and optimization techniques.',
      authorId: adminUser.id,
      categoryId: devOpsCategory.id
    }
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
  }

  // Connect tags to posts
  const awsTag = await prisma.tag.findUnique({ where: { slug: 'aws' } })
  const dockerTag = await prisma.tag.findUnique({ where: { slug: 'docker' } })
  const kubernetesTag = await prisma.tag.findUnique({ where: { slug: 'kubernetes' } })
  const cicdTag = await prisma.tag.findUnique({ where: { slug: 'cicd' } })

  if (awsTag && kubernetesTag) {
    await prisma.post.update({
      where: { slug: 'complete-guide-aws-eks' },
      data: {
        tags: {
          connect: [{ id: awsTag.id }, { id: kubernetesTag.id }]
        }
      }
    })
  }

  if (dockerTag) {
    await prisma.post.update({
      where: { slug: 'docker-multi-stage-builds' },
      data: {
        tags: {
          connect: [{ id: dockerTag.id }]
        }
      }
    })
  }

  if (cicdTag) {
    await prisma.post.update({
      where: { slug: 'cicd-github-actions' },
      data: {
        tags: {
          connect: [{ id: cicdTag.id }]
        }
      }
    })
  }

  console.log('✅ Created blog posts with tags')

  // Create sample photos
  const photos = [
    {
      title: 'Mountain Landscape',
      description: 'Beautiful mountain landscape at sunrise',
      imageUrl: 'https://images.unsplash.com/photo-1464822759831-99d85b2fe472?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1464822759831-99d85b2fe472?w=400',
      category: 'NATURE',
      tags: ['landscape', 'mountains', 'sunrise'],
      featured: true
    },
    {
      title: 'Modern Architecture',
      description: 'Contemporary building design with clean lines',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      category: 'ARCHITECTURE',
      tags: ['architecture', 'modern', 'building']
    },
    {
      title: 'Street Photography',
      description: 'Candid moment captured in urban setting',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      category: 'STREET',
      tags: ['street', 'urban', 'candid']
    },
    {
      title: 'Portrait Session',
      description: 'Professional portrait with natural lighting',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=400',
      category: 'PORTRAIT',
      tags: ['portrait', 'natural light', 'professional']
    }
  ]

  for (const photo of photos) {
    await prisma.photo.upsert({
      where: { 
        id: photo.imageUrl // Use imageUrl as unique identifier
      },
      update: {},
      create: {
        id: photo.imageUrl,
        ...photo,
        category: photo.category as any // Cast to enum
      }
    })
  }

  console.log('✅ Created sample photos')

  // Create sample videos
  const videos = [
    {
      title: 'Introduction to Docker Containers',
      description: 'Learn the basics of Docker containerization and how to get started',
      youtubeId: 'fqMOX6JJhGo', // Sample YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/fqMOX6JJhGo/maxresdefault.jpg',
      category: 'TECH',
      tags: ['docker', 'containers', 'tutorial'],
      featured: true,
      duration: 1200 // 20 minutes
    },
    {
      title: 'AWS EKS Deep Dive',
      description: 'Comprehensive guide to Amazon Elastic Kubernetes Service',
      youtubeId: 'SsUnPWp5ilc', // Sample YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/SsUnPWp5ilc/maxresdefault.jpg',
      category: 'TUTORIAL',
      tags: ['aws', 'kubernetes', 'eks'],
      duration: 1800 // 30 minutes
    }
  ]

  for (const video of videos) {
    await prisma.video.upsert({
      where: { youtubeId: video.youtubeId },
      update: {},
      create: {
        ...video,
        category: video.category as any // Cast to enum
      }
    })
  }

  console.log('✅ Created sample videos')

  // Create resume data
  const resumeData = {
    personalInfo: {
      name: "Om Thakur",
      title: "Cloud & DevOps Engineer",
      email: "om@thakur.com",
      phone: "+91-XXXXXXXXXX",
      location: "India",
      website: "https://omthakur.com",
      linkedin: "https://linkedin.com/in/omthakur",
      github: "https://github.com/omthakur"
    },
    summary: "Experienced Cloud & DevOps Engineer with 5+ years of expertise in AWS, containerization, and infrastructure automation. Passionate about building scalable, secure, and efficient cloud solutions.",
    experience: [
      {
        company: "TechCorp Solutions",
        position: "Senior DevOps Engineer",
        duration: "2022 - Present",
        location: "Remote",
        responsibilities: [
          "Led cloud migration projects resulting in 40% cost reduction",
          "Designed and implemented CI/CD pipelines using Jenkins and GitHub Actions",
          "Managed Kubernetes clusters on AWS EKS serving 1M+ daily users",
          "Automated infrastructure provisioning using Terraform and CloudFormation"
        ]
      },
      {
        company: "CloudTech Inc",
        position: "DevOps Engineer",
        duration: "2020 - 2022",
        location: "Bangalore, India",
        responsibilities: [
          "Implemented Docker containerization for 50+ microservices",
          "Set up monitoring and alerting using Prometheus and Grafana",
          "Reduced deployment time by 70% through automation",
          "Maintained 99.9% system uptime through effective monitoring"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Indian Institute of Technology",
        duration: "2016 - 2020",
        location: "India"
      }
    ],
    skills: {
      cloud: ["AWS", "Azure", "Google Cloud"],
      devops: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions"],
      infrastructure: ["Terraform", "CloudFormation", "Ansible", "Puppet"],
      monitoring: ["Prometheus", "Grafana", "ELK Stack", "DataDog"],
      programming: ["Python", "Bash", "Go", "JavaScript", "TypeScript"],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    certifications: [
      {
        name: "AWS Certified Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        date: "2023"
      },
      {
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "CNCF",
        date: "2022"
      },
      {
        name: "HashiCorp Certified: Terraform Associate",
        issuer: "HashiCorp",
        date: "2022"
      }
    ]
  }

  await prisma.resume.upsert({
    where: { id: 'default-resume' },
    update: { content: resumeData },
    create: {
      id: 'default-resume',
      content: resumeData,
      pdfUrl: '/resume/om-thakur-resume.pdf'
    }
  })

  console.log('✅ Created resume data')

  // Create portfolio items
  const portfolioItems = [
    {
      title: "Multi-Cloud Infrastructure Platform",
      description: "Built a comprehensive infrastructure management platform supporting AWS, Azure, and GCP with unified monitoring and cost optimization.",
      content: `## Project Overview

This project involved building a multi-cloud infrastructure management platform that provides:

- **Unified Dashboard**: Single pane of glass for managing resources across AWS, Azure, and GCP
- **Cost Optimization**: Automated recommendations for cost savings
- **Security Monitoring**: Continuous compliance and security scanning
- **Auto-scaling**: Intelligent resource scaling based on demand

## Technologies Used

- **Infrastructure**: Terraform, Ansible
- **Backend**: Python, FastAPI, PostgreSQL
- **Frontend**: React, TypeScript, D3.js
- **Monitoring**: Prometheus, Grafana, ELK Stack
- **Cloud Providers**: AWS, Azure, GCP`,
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800"
      ],
      demoUrl: "https://demo.multicloud-platform.com",
      githubUrl: "https://github.com/omthakur/multicloud-platform",
      technologies: ["AWS", "Azure", "GCP", "Terraform", "Python", "React"],
      category: "Cloud Infrastructure",
      featured: true,
      order: 1
    },
    {
      title: "Kubernetes CI/CD Pipeline",
      description: "Designed and implemented a fully automated CI/CD pipeline for microservices deployment on Kubernetes with advanced monitoring and rollback capabilities.",
      content: `## Project Overview

Comprehensive CI/CD solution for microservices architecture:

- **GitOps Workflow**: Automated deployments triggered by Git commits
- **Multi-Environment**: Seamless promotion from dev to staging to production
- **Security Scanning**: Integrated security and vulnerability scanning
- **Monitoring**: Real-time application and infrastructure monitoring

## Key Features

- Zero-downtime deployments
- Automatic rollback on failure
- Blue-green deployment strategy
- Comprehensive test automation`,
      images: [
        "https://images.unsplash.com/photo-1667372393230-091ad1cdb4c4?w=800",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
      ],
      githubUrl: "https://github.com/omthakur/k8s-cicd-pipeline",
      technologies: ["Kubernetes", "Jenkins", "Docker", "Helm", "ArgoCD", "Prometheus"],
      category: "DevOps",
      featured: true,
      order: 2
    },
    {
      title: "Serverless Data Pipeline",
      description: "Built a scalable serverless data processing pipeline on AWS for real-time analytics and machine learning workloads.",
      content: `## Architecture

Event-driven serverless architecture for data processing:

- **Data Ingestion**: API Gateway + Lambda for real-time data intake
- **Stream Processing**: Kinesis Data Streams for real-time processing
- **Storage**: S3 Data Lake with intelligent tiering
- **Analytics**: Athena and QuickSight for business intelligence

## Benefits

- 90% reduction in infrastructure costs
- Automatic scaling based on demand
- Real-time data processing capabilities
- Reduced operational overhead`,
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      ],
      technologies: ["AWS Lambda", "Kinesis", "S3", "DynamoDB", "Athena", "QuickSight"],
      category: "Data Engineering",
      order: 3
    }
  ]

  for (const item of portfolioItems) {
    await prisma.portfolio.upsert({
      where: { id: `portfolio-${item.order}` },
      update: {},
      create: {
        id: `portfolio-${item.order}`,
        ...item
      }
    })
  }

  console.log('✅ Created portfolio items')

  // Create initial settings
  const settings = [
    { key: 'site_name', value: 'Om Thakur - Personal Website', type: 'STRING' },
    { key: 'site_description', value: 'Cloud & DevOps Engineer | AWS Instructor | Technical Blogger', type: 'STRING' },
    { key: 'ads_enabled', value: 'false', type: 'BOOLEAN' },
    { key: 'comments_enabled', value: 'true', type: 'BOOLEAN' },
    { key: 'newsletter_enabled', value: 'true', type: 'BOOLEAN' }
  ]

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: {
        ...setting,
        type: setting.type as any // Cast to enum
      }
    })
  }

  console.log('✅ Created initial settings')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })