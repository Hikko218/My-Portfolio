# 🌐 My Portfolio

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000?logo=vercel)](https://your-project.vercel.app)
[![CI](https://img.shields.io/github/actions/workflow/status/Hikko218/My-Portfolio/backend-test.yml?label=Build&logo=githubactions)](https://github.com/Hikko218/My-Portfolio/actions)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/heiko-ries-b35778374)

A modern Full-Stack Portfolio, developed with **Next.js**, **NestJS**, **TypeORM**, **PostgreSQL** and **Tailwind CSS**.  
Includes a **contact form with email-sending**, **admin Dashboard**, **SEO optimization** and **Sentry error tracking**.

---

## 🖼️ Preview

![Screenshot](./Backend/public/uploads/Titel_Picture.png)

---

## 🛠️ Tech Stack & Tools

![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38BDF8?logo=tailwindcss)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-FFA500?logo=typeorm)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?logo=postgresql)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-009688?logo=gmail)
![Brevo](https://img.shields.io/badge/Brevo-SMTP-074A64?logo=maildotru)
![Jest](https://img.shields.io/badge/Jest-Tests-C21325?logo=jest)
![Supertest](https://img.shields.io/badge/Supertest-E2E_Tests-555555)
![Sentry](https://img.shields.io/badge/Sentry-Monitoring-362D59?logo=sentry)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## 🚀 Features

- ⚡ **Next.js (App Router)** – blazing fast SSR-ready React pages
- 🧠 **NestJS Backend** – modular & scalable API design
- ⚙️ **Admin Dashboard** – update your portfolio content
- 📁 **File uploads** – via Multer (NestJS)
- ✉️ **Contact form** – using Nodemailer (Sendinblue/Brevo SMTP)
- 🛡️ **Sentry** – for real-time error tracking
- 📈 **SEO** - with `next-sitemap` and Open Graph tags
- 💾 **PostgreSQL + TypeORM** - with auto-migration
- 🎨 **Tailwind CSS** – for fast, modern Styling

---

## 📦 Installation

### 1. Create `.env` in the frontend:
- .env:
- NEXT_PUBLIC_API_URL=/api
- NEXT_PUBLIC_IMAGE_URL=http://localhost:3000

### 2. create `.env` in the backend
- DATABASE_URL=postgres://user:pass@localhost:5432/mydb
- SENTRY_DSN=yourLink
- SENTRY_AUTH_TOKEN=yourToken
- SMTP_HOST=smtp-relay.sendinblue.com
- SMTP_PORT=587
- SMTP_USER=your@email.com
- SMTP_PASS=********
- CONTACT_RECEIVER_EMAIL=your@email.com

### 3. Install dependencies and start dev servers
- # frontend
- cd frontend
- npm install
- npm run dev

- # backend
- cd backend
- npm install
- npm run start:dev

---

## ✅ Testing
- ✅ Send a test message via the contact form
- ✅ Monitor Sentry dashboard for real-time errors → [sentry.io](https://sentry.io)
- ✅ Verify SEO & Open Graph preview → [opengraph.xyz](https://opengraph.xyz)
- ✅ Backend tests (Jest, Supertest) run automatically on every push via GitHub Actions  





