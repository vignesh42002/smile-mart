# Smile Mart - Cloudflare Hosting Guide (Separate Website & Admin)

This guide explains how to host the **Main Storefront Website** and **Admin Panel** separately or on subdomains using Cloudflare Workers / Pages.

---

## 🚀 Deployment Options

### Method 1: Separate Cloudflare Pages / Workers Projects (Recommended for Separate Hosting)

You can deploy two distinct Cloudflare projects:
1. `smile-mart-website` (for public customers)
2. `smile-mart-admin` (for administrative control)

#### Commands:
```bash
# 1. Deploy Main Website (smile-mart-website)
npm run cf:deploy:website

# 2. Deploy Admin Panel (smile-mart-admin)
npm run cf:deploy:admin
```

---

### Method 2: Single Deployment with Subdomain Routing (e.g. `smilemart.com` & `admin.smilemart.com`)

If you want to deploy a single unified codebase to Cloudflare, our built-in `middleware.ts` automatically handles subdomains:

- `smilemart.com` or `www.smilemart.com` ➔ Serves Storefront Website
- `admin.smilemart.com` ➔ Automatically rewrites requests to `/admin` dashboard safely with auth protection.

#### Commands:
```bash
npm run cf:deploy
```

---

## 🛠 Cloudflare Pages Dashboard Setup

If connecting via Git on Cloudflare Pages Dashboard:

1. **Website Project (`smile-mart-website`)**:
   - **Build Command**: `npm run cf:build`
   - **Output Directory**: `.open-next/assets`
   - **Custom Domain**: `smilemart.com` (or your domain)

2. **Admin Project (`smile-mart-admin`)**:
   - **Build Command**: `npm run cf:build`
   - **Output Directory**: `.open-next/assets`
   - **Custom Domain**: `admin.smilemart.com`

---

## 🔑 Environment Variables Needed on Cloudflare

Set these in your Cloudflare Dashboard under **Settings ➔ Environment Variables**:

- `JWT_SECRET`: Secret key for admin authentication session.
- `NEXT_PUBLIC_APP_URL`: Base URL of your website (e.g. `https://smilemart.com`).
