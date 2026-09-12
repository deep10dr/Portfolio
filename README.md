# 🚀 Deepak's Portfolio

A high-performance personal portfolio showcasing full-stack systems, self-hosted platforms, and modern web applications built by Deepak S.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2.21-FF3E00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5_(Runes)-FF3E00?logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F68E0B)

---

## ✨ Features

- **🔄 Morphing Top-Left Circular Header** — Pinned full floating navbar in the Home section that smoothly shrinks into a compact circular badge at the top-left while scrolling, displaying live section indicators (`01 Home`, `02 About Me`, `03 Technologies`, `04 Projects`, `05 Contact`) with a quick-jump dropdown.
- **🦆 Interactive Rubber Duck Tour Guide** — Fixed mascot companion with Web Audio API synthesized cartoon quacks, live exploration progress tracking (`1/5` to `5/5`), section-by-section guided navigation, and cookie/localStorage persistence.
- **⚡ Interactive Technologies Showcase** — Dual-mode architectural showcase with an icon-only switcher:
  - **Bento Architecture Mode**: 6 architectural domains (Languages, Frontend, Backend, Database & Storage, DevOps & Platform, AI & ML).
  - **Quick Grid Mode**: Filterable technology pills with smooth scaling.
- **💼 Projects Showcase** — Prominently features the flagship self-hosted **DeepPhotos** platform (Svelte, Go, SQLite, MinIO, Docker) with dual-mode views:
  - **Modern Grid View**: Clean aspect cards with deployment badges and "Demo Unavailable" fallbacks.
  - **Spotlight Deep-Dive**: Full-width interactive carousel detailing real engineering challenges and architectural solutions.
- **📬 Direct Contact & Click-to-Copy** — 1-click email copy with instant toast feedback, alongside a direct SMTP form powered by Express and Nodemailer.
- **🎨 Custom Palette & Glassmorphic Design** — Cohesive theme (`#FCF6DC` background, `#FCF1D4` surface, `#44A4D8` brand blue, and `#F68E0B` interactive accents).
- **⚡ Performance Optimized** — Preconnected Google Fonts, `content-visibility: auto` off-screen rendering, and asynchronous image decoding.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [SvelteKit 2](https://kit.svelte.dev/) | Application framework with Vite integration |
| [Svelte 5](https://svelte.dev/) | Runes reactivity model (`$state`, `$derived`, `$effect`) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Modern utility-first CSS engine |
| [Lucide Svelte](https://lucide.dev/) | UI vector icons |
| [Vite 6](https://vite.dev/) | Ultra-fast development and optimized production bundling |

### Backend
| Technology | Purpose |
|---|---|
| [Express 5](https://expressjs.com/) | Secure REST API server |
| [Nodemailer](https://nodemailer.com/) | SMTP email delivery with SPF/DKIM compliant headers |
| [dotenv](https://www.npmjs.com/package/dotenv) | Safe environment configuration |
| [cors](https://www.npmjs.com/package/cors) | Cross-origin request handling |

---

## 📁 Project Structure

```
Portfolio/
├── .gitignore                   # Root repository git ignore rules
├── Frontend/                    # SvelteKit client application
│   ├── src/
│   │   ├── app.html             # HTML shell with font preconnects
│   │   ├── app.css              # Global styles, scrollbars & dot mesh
│   │   ├── routes/
│   │   │   ├── +layout.svelte   # Root layout (Toast + DuckGuide)
│   │   │   └── +page.svelte     # Single-page application composition
│   │   └── lib/
│   │       ├── toast.svelte.js  # Reactive toast store
│   │       ├── icons/           # Custom SVG brand & mascot components
│   │       │   ├── DuckIcon.svelte
│   │       │   ├── GithubIcon.svelte
│   │       │   ├── LinkedinIcon.svelte
│   │       │   ├── LeetcodeIcon.svelte
│   │       │   └── InstagramIcon.svelte
│   │       └── components/
│   │           ├── Navbar.svelte       # Morphing circular header
│   │           ├── HeroSection.svelte  # Profile & 3D tech badges
│   │           ├── About.svelte        # Engineering narrative & chips
│   │           ├── Skills.svelte       # Bento & Quick Grid views
│   │           ├── Project.svelte      # Cards & Spotlight carousel
│   │           ├── Contact.svelte      # 2-col info & contact form
│   │           ├── Footer.svelte       # Dark blue branded footer
│   │           ├── DuckGuide.svelte    # Interactive tour companion
│   │           └── Toast.svelte        # Toast notification banner
│   ├── static/                  # Static assets
│   │   ├── images/              # Profile photographs
│   │   ├── icons/               # Technology icons
│   │   ├── projects/            # Project previews & SVG banners
│   │   └── resume.pdf           # Downloadable resume
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── package.json
│
├── Backend/                     # Express email API
│   ├── index.js                 # Hardened API endpoint (HTML sanitization, limits)
│   ├── .env                     # Local environment secrets (ignored by git)
│   ├── .env.example             # Safe template for environment variables
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Backend Setup

1. Copy the example environment file:
   ```bash
   cd Backend
   cp .env.example .env
   ```

2. Configure `.env` with your credentials:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```

3. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```

The backend API server will run on `http://localhost:5000`.

---

## 🔒 Security & Best Practices

- **Never commit `.env` files**: All secret keys and app passwords must remain in `.env` (guarded by root, Frontend, and Backend `.gitignore` files).
- **HTML Sanitization**: All contact submissions are entity-escaped before email generation to prevent XSS / HTML injection in email clients.
- **Payload Bounding**: Request JSON sizes are constrained to 50KB to mitigate Denial of Service (DoS) memory exhaustion.
- **SPF/DKIM Compliance**: Nodemailer sends emails using the authenticated account with `Reply-To` set to the visitor's address.

---

## 🌐 Deployment

| Service | Host |
|---|---|
| **Frontend** | [Vercel](https://vercel.com) / [Cloudflare Pages](https://pages.cloudflare.com) |
| **Backend** | [Railway](https://railway.app) / [Render](https://render.com) |

To build the frontend for production:
```bash
cd Frontend
npm run build
npm run preview
```

---

## 🔗 Connect

- **LinkedIn**: [deepak-s-dr](https://www.linkedin.com/in/deepak-s-dr)
- **GitHub**: [deep10dr](https://github.com/deep10dr)
- **LeetCode**: [deepdr10](https://leetcode.com/u/deepdr10/)
- **Instagram**: [deep_dr_46](https://www.instagram.com/deep_dr_46)
- **Email**: [deepakofficial81@gmail.com](mailto:deepakofficial81@gmail.com)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

