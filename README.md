# 🌐 My Portfolio

A modern Full-Stack Portfolio, developed with **Next.js**, **NestJS**, **TypeORM**, **PostgreSQL** und **Tailwind CSS**.  
Includes a **contact form with email-sending**, **SEO optimization** and **Sentry error tracking**.

---

## 🚀 Features

- ⚡ **Next.js (App Router)** – fast SSR/SSG React-Pages
- 🧠 **NestJS Backend** – modular & scalable API
- 📁 **File uploads** via Multer (NestJS)
- ✉️ **Contact form** with Nodemailer (Sendinblue/Brevo SMTP)
- 🛡️ **Sentry** integration for Error-Tracking
- 📈 **SEO** via `next-seo` + `next-sitemap`
- 💾 **PostgreSQL** with TypeORM (Auto-Migrations)
- 🎨 **Tailwind CSS** for modern Styling

---

## ⚙️ Tech Stack

| Frontend       | Backend        | Tools & Services        |
|----------------|----------------|--------------------------|
| Next.js 14     | NestJS 11      | Sentry, Nodemailer       |
| React 18       | TypeORM        | Brevo (SMTP)             |
| Tailwind CSS   | PostgreSQL     | dotenv, next-seo         |

---

## 📦 Installation

### 1. Create .env.local in the frontend:
- .env:
- NEXT_PUBLIC_API_URL=http://localhost:3001

### 2. create .env
- DATABASE_URL=postgres://user:pass@localhost:5432/mydb
- SENTRY_DSN=yourLink
- SENTRY_AUTH_TOKEN=yourToken
- SMTP_HOST=smtp-relay.sendinblue.com
- SMTP_PORT=587
- SMTP_USER=your@email.com
- SMTP_PASS=********
- CONTACT_RECEIVER_EMAIL=your@email.com

### 4. Install dependencies and start dev servers
- # frontend
- cd frontend
- npm install
- npm run dev

- # backend
- cd backend
- npm install
- npm run start:dev

---

## Testing
- Send a test message via the contact form
- Check for errors in the Sentry-Dashboard (https://sentry.io
- Verify SEO & Open Graph with (https://opengraph.xyz)

