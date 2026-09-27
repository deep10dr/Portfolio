# Deepak's Portfolio

A personal engineering portfolio showcasing full-stack systems, self-hosted platforms, and modern web applications built by Deepak S.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2.21-FF3E00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5_(Runes)-FF3E00?logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F68E0B)

---

## Features

- **Morphing Top-Left Circular Header** — Pinned floating navigation bar in the Home section that smoothly transforms into a compact circular badge at the top-left while scrolling, displaying live section indicators with a quick-jump menu.
- **Interactive Debugger Companion** — Mascot companion with Web Audio API synthesized audio, exploration progress tracking, and interactive developer easter eggs.
- **Technologies Showcase** — Dual-mode architectural showcase:
  - **Bento Architecture Mode**: Six core architectural layers (Languages, Frontend, Backend, Database and Storage, DevOps and Platform, AI and ML).
  - **Quick Grid Mode**: Filterable technology pills with responsive scaling.
- **Projects Showcase** — Features the self-hosted **DeepPhotos** platform (Svelte, Go, SQLite, MinIO, Docker) with dual-mode views:
  - **Grid View**: Structured cards with deployment badges and fallback indicators.
  - **Spotlight Mode**: Full-width interactive carousel detailing engineering challenges and architectural trade-offs.
- **Direct Mailbox Integration** — One-click email copy with instant notification feedback, combined with direct mailbox redirection (`mailto:`) and Gmail Web support. Zero server dependencies and direct communication.
- **Design System** — Custom palette featuring `#FCF6DC` background, `#FCF1D4` surface, `#44A4D8` brand blue, and `#F68E0B` interactive accents.
- **Performance Optimization** — Preconnected Google Fonts, `content-visibility: auto` off-screen rendering, and asynchronous image decoding.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [SvelteKit 2](https://kit.svelte.dev/) | Application framework with Vite integration |
| [Svelte 5](https://svelte.dev/) | Runes reactivity model (`$state`, `$derived`, `$effect`) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS engine |
| [Lucide Svelte](https://lucide.dev/) | Vector UI icons |
| [Vite 6](https://vite.dev/) | Development environment and production bundler |

---

## Project Structure

```
Portfolio/
├── .gitignore                   # Repository git ignore rules
├── Frontend/                    # SvelteKit client application
│   ├── src/
│   │   ├── app.html             # HTML shell with font preconnects
│   │   ├── app.css              # Global styles, scrollbars, and mesh grid
│   │   ├── routes/
│   │   │   ├── +layout.svelte   # Root layout (Toast + DuckGuide)
│   │   │   └── +page.svelte     # Single-page application composition
│   │   └── lib/
│   │       ├── toast.svelte.js  # Reactive toast store
│   │       ├── icons/           # Custom SVG brand components
│   │       │   ├── DuckIcon.svelte
│   │       │   ├── GithubIcon.svelte
│   │       │   ├── LinkedinIcon.svelte
│   │       │   ├── LeetcodeIcon.svelte
│   │       │   └── InstagramIcon.svelte
│   │       └── components/
│   │           ├── Navbar.svelte       # Morphing circular header
│   │           ├── HeroSection.svelte  # Profile and technical introduction
│   │           ├── About.svelte        # Engineering narrative and credentials
│   │           ├── Skills.svelte       # Bento and Quick Grid views
│   │           ├── Project.svelte      # Cards and Spotlight carousel
│   │           ├── Contact.svelte      # Contact cards and direct mailbox redirect
│   │           ├── Footer.svelte       # Branded footer
│   │           ├── DuckGuide.svelte    # Interactive companion
│   │           └── Toast.svelte        # Notification banner
│   ├── static/                  # Static assets
│   │   ├── images/              # Photographs
│   │   ├── icons/               # Technology icons
│   │   ├── projects/            # Project previews and banners
│   │   └── resume.pdf           # Downloadable resume
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9

### Local Development

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## Production Build and Deployment

The application is configured for deployment on **Vercel** with `@sveltejs/adapter-auto`.

To test the production build locally:
```bash
cd Frontend
npm run build
npm run preview
```

### Vercel Deployment

1. Connect the repository to [Vercel](https://vercel.com).
2. Configure the **Root Directory** setting to `Frontend`.
3. Vercel automatically detects SvelteKit and handles the build output.

---

## Connect

- **LinkedIn**: [deepak-s-dr](https://www.linkedin.com/in/deepak-s-dr)
- **GitHub**: [deep10dr](https://github.com/deep10dr)
- **LeetCode**: [deepdr10](https://leetcode.com/u/deepdr10/)
- **Instagram**: [deep_dr_46](https://www.instagram.com/deep_dr_46)
- **Email**: [deepakofficial81@gmail.com](mailto:deepakofficial81@gmail.com)

---

## License

This project is open source and available under the [MIT License](LICENSE).
