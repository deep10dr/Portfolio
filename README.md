# 🚀 Deepak's Portfolio

A high-performance personal portfolio showcasing full-stack systems, self-hosted platforms, and modern web applications built by Deepak S.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2.21-FF3E00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5_(Runes)-FF3E00?logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F68E0B)

---

## ✨ Features

- **🔄 Morphing Top-Left Circular Header** — Pinned full floating navbar in the Home section that smoothly shrinks into a compact circular badge at the top-left while scrolling, displaying live section indicators (`01 Home`, `02 About Me`, `03 Technologies`, `04 Projects`, `05 Contact`) with a quick-jump dropdown.
- **🦆 Interactive Rubber Duck Companion** — Mascot companion with Web Audio API synthesized cartoon quacks, exploration tracking, and interactive developer easter eggs.
- **⚡ Interactive Technologies Showcase** — Dual-mode architectural showcase with an icon-only switcher:
  - **Bento Architecture Mode**: 6 architectural domains (Languages, Frontend, Backend, Database & Storage, DevOps & Platform, AI & ML).
  - **Quick Grid Mode**: Filterable technology pills with smooth scaling.
- **💼 Projects Showcase** — Prominently features the flagship self-hosted **DeepPhotos** platform (Svelte, Go, SQLite, MinIO, Docker) with dual-mode views:
  - **Modern Grid View**: Clean aspect cards with deployment badges and "Demo Unavailable" fallbacks.
  - **Spotlight Deep-Dive**: Full-width interactive carousel detailing real engineering challenges and architectural solutions.
- **📬 Efficient Direct Mailbox Integration** — 1-click email copy with instant toast feedback, along with direct mailbox redirection (`mailto:`) and Gmail Web support. Zero server dependencies, zero delivery failures, and direct two-way email communication.
- **🎨 Custom Palette & Glassmorphic Design** — Cohesive theme (`#FCF6DC` background, `#FCF1D4` surface, `#44A4D8` brand blue, and `#F68E0B` interactive accents).
- **⚡ Performance Optimized** — Preconnected Google Fonts, `content-visibility: auto` off-screen rendering, and asynchronous image decoding.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [SvelteKit 2](https://kit.svelte.dev/) | Application framework with Vite integration |
| [Svelte 5](https://svelte.dev/) | Modern Runes reactivity model (`$state`, `$derived`, `$effect`) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Modern utility-first CSS engine |
| [Lucide Svelte](https://lucide.dev/) | UI vector icons |
| [Vite 6](https://vite.dev/) | Ultra-fast development and optimized production bundling |

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
│   │           ├── Contact.svelte      # 2-col info & direct mailbox redirect
│   │           ├── Footer.svelte       # Dark blue branded footer
│   │           ├── DuckGuide.svelte    # Interactive companion
│   │           └── Toast.svelte        # Toast notification banner
│   ├── static/                  # Static assets
│   │   ├── images/              # Profile photographs
│   │   ├── icons/               # Technology icons
│   │   ├── projects/            # Project previews & SVG banners
│   │   └── resume.pdf           # Downloadable resume
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Local Development

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🌐 Production Build & Deployment

The application is optimized for deployment on **Vercel** with `@sveltejs/adapter-auto`.

To test the production build locally:
```bash
cd Frontend
npm run build
npm run preview
```

### Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set the **Root Directory** to `Frontend` in project settings.
3. Vercel automatically detects SvelteKit and deploys.

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
