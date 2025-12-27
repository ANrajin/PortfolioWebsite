# Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, React 19, and Express.js. Features a dynamic admin panel for content management, responsive design with dark/light theme, and a comprehensive REST API.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Express](https://img.shields.io/badge/Express-4.21-green)
![Prisma](https://img.shields.io/badge/Prisma-6.0-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

### Public Website
- **Hero Section** - Dynamic introduction with Matrix Rain animation effect
- **About Section** - Career objective and personal information
- **Experience Timeline** - Work history with technology tags
- **Skills Section** - Categorized skills with proficiency indicators
- **Projects Showcase** - Featured projects with images and links
- **Education Section** - Academic background
- **Certifications** - Professional certifications with expandable details and credential links
- **Articles/Publications** - Blog posts and external publications
- **Contact Section** - Contact form with social media links
- **PDF Resume Generation** - Dynamic resume generation via `/api/resume`

### Admin Panel
- **Google OAuth Authentication** - Secure login with allowed email whitelist
- **Full CRUD Operations** - Manage all portfolio sections
- **File Uploads** - Image and document uploads with server storage
- **Rich Content Editing** - Form-based content management
- **Real-time Preview** - Changes reflect immediately on the public site

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Theme** - System-aware theme switching
- **Server-Side Rendering** - Optimized SEO with Next.js SSR
- **Type Safety** - Full TypeScript implementation
- **API Caching** - Efficient data fetching with caching strategies

---

## 🛠 Tech Stack

### Frontend (`apps/web`)
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.x | React framework with SSR/SSG |
| [React](https://react.dev/) | 19.x | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first CSS framework |
| [NextAuth.js](https://next-auth.js.org/) | 5.0 | Authentication library |
| [Lucide React](https://lucide.dev/) | 0.460 | Icon library |
| [jsPDF](https://github.com/parallax/jsPDF) | 3.x | PDF generation |

### Backend (`apps/api`)
| Technology | Version | Purpose |
|------------|---------|---------|
| [Express.js](https://expressjs.com/) | 4.21 | Web framework |
| [Prisma](https://www.prisma.io/) | 6.0 | ORM & database toolkit |
| [MySQL](https://www.mysql.com/) | 8.0+ | Relational database |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | Type-safe JavaScript |
| [tsx](https://github.com/privatenumber/tsx) | 4.19 | TypeScript execution |
| [Multer](https://github.com/expressjs/multer) | 2.0 | File upload middleware |
| [CORS](https://github.com/expressjs/cors) | 2.8 | Cross-origin resource sharing |

### Shared (`packages/shared`)
- Shared TypeScript types and utilities between frontend and backend

---

## 🏗 Project Architecture

```
portfolio/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/
│   │   │   ├── admin/          # Admin panel pages
│   │   │   │   ├── articles/
│   │   │   │   ├── certifications/
│   │   │   │   ├── education/
│   │   │   │   ├── experiences/
│   │   │   │   ├── information/
│   │   │   │   ├── projects/
│   │   │   │   └── skills/
│   │   │   ├── api/            # Next.js API routes
│   │   │   │   └── resume/     # PDF resume generation
│   │   │   ├── auth/           # Authentication pages
│   │   │   └── page.tsx        # Homepage
│   │   ├── components/
│   │   │   ├── admin/          # Admin UI components
│   │   │   └── presentational/ # Public site components
│   │   │       ├── HeroSection.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── ExperienceSection.tsx
│   │   │       ├── SkillsSection.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       ├── EducationSection.tsx
│   │   │       ├── CertificationsSection.tsx
│   │   │       ├── ArticlesSection.tsx
│   │   │       ├── ContactSection.tsx
│   │   │       └── ...
│   │   └── lib/                # Utility functions & auth config
│   │
│   └── api/                    # Express backend application
│       ├── prisma/
│       │   ├── schema.prisma   # Database schema
│       │   └── seed.ts         # Database seeding
│       └── src/
│           ├── index.ts        # Express server entry point
│           ├── lib/            # Database client & utilities
│           └── routes/         # API route handlers
│               ├── personal-info.ts
│               ├── experiences.ts
│               ├── skills.ts
│               ├── projects.ts
│               ├── education.ts
│               ├── certifications.ts
│               ├── articles.ts
│               ├── portfolio.ts
│               └── upload.ts
│
├── packages/
│   └── shared/                 # Shared types & utilities
│
├── package.json                # Root workspace configuration
├── DEPLOYMENT.md               # VPS deployment guide
└── README.md                   # This file
```

### System Architecture Diagram

```
                                    ┌──────────────────────────────────────┐
                                    │            Client Browser            │
                                    └──────────────────┬───────────────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                    Nginx (Reverse Proxy)                             │
│                               SSL Termination & Load Balancing                       │
└────────────────────────────────────────┬─────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
    ┌───────────────────────────────┐         ┌───────────────────────────────┐
    │      Next.js Frontend         │         │      Express.js Backend       │
    │        (Port 3000)            │         │        (Port 3001)            │
    │                               │         │                               │
    │  • Server-Side Rendering      │         │  • REST API                   │
    │  • Static Generation          │ ──────▶ │  • File Upload Handler        │
    │  • NextAuth.js Auth           │   API   │  • Prisma ORM                 │
    │  • PDF Generation             │  Calls  │  • CORS Support               │
    └───────────────────────────────┘         └───────────────┬───────────────┘
                                                              │
                                                              ▼
                                              ┌───────────────────────────────┐
                                              │        MySQL Database         │
                                              │                               │
                                              │  • Personal Info              │
                                              │  • Experiences                │
                                              │  • Skills                     │
                                              │  • Projects                   │
                                              │  • Education                  │
                                              │  • Certifications             │
                                              │  • Articles                   │
                                              │  • Social Links               │
                                              └───────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MySQL** 8.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create the required `.env` files (see [Environment Variables](#-environment-variables))

4. **Initialize the database**
   ```bash
   cd apps/api
   npx prisma generate
   npx prisma db push
   npx prisma db seed   # Optional: seed with sample data
   cd ../..
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts both:
   - **Web**: http://localhost:3005
   - **API**: http://localhost:3001

---

## 🔐 Environment Variables

### API (`apps/api/.env`)

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/portfolio"

# Server
PORT=3001
NODE_ENV=development
```

### Web (`apps/web/.env.local`)

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"

# NextAuth.js Configuration
AUTH_SECRET="your-auth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin Access (comma-separated email list)
ADMIN_EMAILS="admin@example.com"

# Production only
AUTH_TRUST_HOST=true
```

---

## 📜 Available Scripts

### Root Level

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both web and API in development mode |
| `npm run dev:web` | Start only the web app |
| `npm run dev:api` | Start only the API server |
| `npm run build` | Build all workspaces for production |
| `npm run lint` | Run ESLint across all workspaces |

### API (`apps/api`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start API with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio GUI |

### Web (`apps/web`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔌 API Endpoints

### Portfolio (Combined Data)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio` | Get complete portfolio data |

### Personal Information

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/personal-info` | Get personal information |
| PUT | `/personal-info` | Update personal information |

### Experiences

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/experiences` | List all experiences |
| POST | `/experiences` | Create new experience |
| PUT | `/experiences/:id` | Update experience |
| DELETE | `/experiences/:id` | Delete experience |

### Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/skills` | List all skills |
| POST | `/skills` | Create new skill |
| PUT | `/skills/:id` | Update skill |
| DELETE | `/skills/:id` | Delete skill |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | List all projects |
| POST | `/projects` | Create new project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Education

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/education` | List all education entries |
| POST | `/education` | Create new education entry |
| PUT | `/education/:id` | Update education entry |
| DELETE | `/education/:id` | Delete education entry |

### Certifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/certifications` | List all certifications |
| POST | `/certifications` | Create new certification |
| PUT | `/certifications/:id` | Update certification |
| DELETE | `/certifications/:id` | Delete certification |

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | List all articles |
| POST | `/articles` | Create new article |
| PUT | `/articles/:id` | Update article |
| DELETE | `/articles/:id` | Delete article |

### File Upload

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload file (image/document) |

---

## 🚢 Deployment

For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Overview

1. **Server Requirements**
   - Linux VPS (Ubuntu 22.04+ recommended)
   - Node.js 20.x
   - MySQL 8.0+
   - PM2 (process manager)
   - Nginx (reverse proxy)

2. **Production Stack**
   ```
   Nginx → Next.js (Port 3000) → Express API (Port 3001) → MySQL
   ```

3. **Key Steps**
   - Clone repository to `/var/www/portfolio`
   - Configure environment variables
   - Run Prisma migrations
   - Build Next.js application
   - Start with PM2
   - Configure Nginx reverse proxy
   - Enable SSL with Let's Encrypt

4. **Update Procedure**
   ```bash
   git pull origin main
   npm install
   npm run build --workspace=apps/web
   cd apps/api && npx prisma db push && cd ../..
   pm2 reload all
   ```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ANrajin/PortfolioWebsite/issues).

---

## 👨‍💻 Author

**Anrajin**
- GitHub: [@anrajin](https://github.com/anrajin)
- LinkedIn: [Anrajin](https://linkedin.com/in/an-rajin)

---

<p align="center">
  Made with ❤️ using Antigravity
</p>
