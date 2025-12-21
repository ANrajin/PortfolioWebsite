# Portfolio Deployment Guide

Complete guide for deploying the Portfolio application on a Linux VPS with Nginx.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│  Next.js    │────▶│  Express    │
│  (Reverse   │     │  (Port 3000)│     │  (Port 3001)│
│   Proxy)    │     └─────────────┘     └──────┬──────┘
└─────────────┘                                │
                                         ┌─────▼─────┐
                                         │   MySQL   │
                                         │  Database │
                                         └───────────┘
```

---

## Prerequisites

- Linux VPS (Ubuntu 22.04+ recommended)
- Domain name pointing to your server IP
- SSH access with sudo privileges
- Git installed

---

## 1. Server Initial Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl git build-essential

# Create app user (optional but recommended)
sudo useradd -m -s /bin/bash appuser
sudo usermod -aG sudo appuser
```

---

## 2. Install Node.js (v18+)

```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show npm version
```

---

## 3. Install MySQL

```bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure installation
sudo mysql_secure_installation

# Login to MySQL
sudo mysql

# Create database and user (run in MySQL prompt)
CREATE DATABASE portfolio;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Enable PM2 to start on boot
pm2 startup systemd
# Run the command it outputs
```

---

## 5. Clone and Setup Application

```bash
# Navigate to app directory
cd /var/www

# Clone repository
sudo git clone https://github.com/YOUR_USERNAME/portfolio.git
sudo chown -R $USER:$USER portfolio
cd portfolio

# Install dependencies
npm install
```

---

## 6. Configure Environment Variables

### API Environment (`apps/api/.env`)

```bash
nano apps/api/.env
```

```env
DATABASE_URL="mysql://portfolio_user:your_secure_password@localhost:3306/portfolio"
PORT=3001
NODE_ENV=production
```

### Web Environment (`apps/web/.env.local`)

```bash
nano apps/web/.env.local
```

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
AUTH_SECRET="generate-with: openssl rand -base64 32"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
ADMIN_EMAILS="youremail@gmail.com"
AUTH_TRUST_HOST=true
```

---

## 7. Database Migration and Seed

```bash
cd apps/api

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database (optional)
npx prisma db seed
```

---

## 8. Build Applications

```bash
# Return to root
cd /var/www/portfolio

# Build Next.js app
npm run build --workspace=apps/web
```

---

## 9. Configure PM2

Create `ecosystem.config.js` in project root:

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'portfolio-web',
      cwd: './apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'portfolio-api',
      cwd: './apps/api',
      script: 'node_modules/.bin/tsx',
      args: 'src/index.ts',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
```

Start applications:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 10. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (Next.js)
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

    # API (Express)
    location /api/ {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 11. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already enabled by default)
sudo certbot renew --dry-run
```

---

## 12. Firewall Setup

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | Check app status |
| `pm2 logs` | View all logs |
| `pm2 logs portfolio-web` | View web logs |
| `pm2 logs portfolio-api` | View API logs |
| `pm2 restart all` | Restart all apps |
| `pm2 reload all` | Zero-downtime reload |

---

## Updating Application

```bash
cd /var/www/portfolio

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Rebuild Next.js
npm run build --workspace=apps/web

# Run migrations (if schema changed)
cd apps/api && npx prisma db push && cd ../..

# Reload applications
pm2 reload all
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check if apps running: `pm2 status` |
| Database connection error | Verify DATABASE_URL in `.env` |
| Permission denied | Run `sudo chown -R $USER:$USER /var/www/portfolio` |
| Port in use | Check: `sudo lsof -i :3000` |

---

## Backup Database

```bash
# Create backup
mysqldump -u portfolio_user -p portfolio > backup_$(date +%Y%m%d).sql

# Restore backup
mysql -u portfolio_user -p portfolio < backup_YYYYMMDD.sql
```
