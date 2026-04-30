# Brick Lane Property Group Website

Vue 3 + CodeIgniter 4 monorepo.

## Quick Start

### Prerequisites
- PHP 8.2+ (pdo_mysql, curl, mbstring, xml, zip, gd)
- Node.js 20+, npm
- Docker Desktop
- Composer 2.x

### Setup

```bash
# Clone
git clone https://github.com/vtion001/bricklane-property-group.git
cd bricklane-property-group

# Backend
cd server && cp env .env && composer install && cd ..

# Frontend
cd client && cp .env.example .env && npm install && cd ..

# Infrastructure
docker compose up -d

# Migrations
cd server && php spark migrate && cd ..

# Dev servers
# Terminal 1: cd server && php spark serve --port 8080
# Terminal 2: cd client && npm run dev
```

## Project Structure

- `client/` — Vue 3 + Vite frontend
- `server/` — CodeIgniter 4 backend
- `docs/` — Project documentation
