# VDN Landscapes — vdnlandscapes.in

A premium, data-driven brochure website for VDN Landscapes built with React, Vite, TypeScript, and Tailwind CSS. Products are managed via Excel and rendered dynamically from JSON.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (recommended: latest LTS)
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd vdnlandscapes

# Install dependencies
npm powershell -ExecutionPolicy Bypass -Command "npm install"
```

### Start Development Server

```bash
npm run dev
```

The app runs at **http://localhost:8080** by default.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — deploy it to any static hosting (Netlify, Vercel, Cloudflare Pages, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Excel → JSON Product Pipeline

Products are managed in an Excel file (`.xlsx`) and converted to JSON for the website.

### Excel Format

Each **sheet** = one product category (e.g., "Plants", "Seeds", "Pots & Planters").

Required column headers:

| Product_ID | Category | Sub_Category | Name | Title | Description | Size | Price (₹) | Image | Care_Level | Watering | Sunlight |
|------------|----------|--------------|------|-------|-------------|------|-----------|-------|------------|----------|----------|

### Converting Excel to JSON

```bash
# Install the xlsx dependency (one-time)
npm install xlsx

# Run the conversion script
node scripts/excel-to-json.js path/to/your-file.xlsx
```

This generates `src/data/products.json` with all categories and products.

### Adding New Categories

Simply add a **new sheet** in your Excel file with the same column headers, then re-run the script. The website picks up new categories automatically.

### Image Mapping

The `Image` column in Excel should contain just the filename (e.g., `areca.jpg`). The script maps it to:

```
/images/products/{category-folder}/{filename}
```

Place your product images in:
```
public/images/products/
├── plants/
├── popular-plants/
├── seeds/
├── pots-and-planters/
└── ...
```

If an image is missing, a placeholder SVG is shown automatically.

---

## ⚙️ Configuration

Edit `src/data/config.json` to update business details:

```json
{
  "phone": "+91XXXXXXXXXX",
  "whatsapp": "https://wa.me/91XXXXXXXXXX",
  "email": "Venkatadurganursery2016@gmail.com",
  "address": "Your Business Address",
  "google_map_embed": "<iframe src='...'></iframe>"
}
```

All contact info across the website updates automatically.

### Other Data Files

| File | Purpose |
|------|---------|
| `src/data/products.json` | Product catalog (auto-generated from Excel) |
| `src/data/projects.json` | Before/after project showcases |
| `src/data/testimonials.json` | Client testimonials |
| `src/data/config.json` | Business contact details |

---

## 🧪 Testing & Debugging

### Run Unit Tests

```bash
npm run test
```

Uses **Vitest** + **React Testing Library**.

### Run Tests in Watch Mode

```bash
npx vitest --watch
```

### Run Playwright E2E Tests

```bash
npx playwright test
```

### Linting

```bash
npm run lint
```

### Common Debug Steps

1. **Console errors** — Open browser DevTools → Console tab
2. **Component not rendering** — Check the data files in `src/data/` for valid JSON
3. **Images not loading** — Verify files exist in `public/images/products/{category}/` and filenames match the Excel `Image` column
4. **Products not showing** — Re-run `node scripts/excel-to-json.js <file.xlsx>` and check `src/data/products.json`
5. **Styling issues** — Design tokens are in `src/index.css` and `tailwind.config.ts`

### Dev Server Options

The dev server binds to `::` (all interfaces) on port **8080**. Change in `vite.config.ts`:

```ts
server: {
  host: "::",
  port: 8080,
}
```

---

## 🏗️ Project Structure

```
├── public/
│   └── images/
│       └── products/         # Product images by category
├── scripts/
│   └── excel-to-json.js      # Excel → JSON converter
├── src/
│   ├── assets/               # Static assets (hero images, logos)
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui primitives
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryShowcase.tsx
│   │   └── ...
│   ├── data/                 # JSON data files
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Route pages
│   │   ├── Index.tsx         # Homepage
│   │   └── Products.tsx      # Product catalog
│   └── main.tsx              # App entry point
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui | Component library |
| Framer Motion | Animations |
| React Router 6 | Client-side routing |
| Vitest | Unit testing |
| Playwright | E2E testing |

---

## 📋 Workflow for Non-Developers

1. **Update products** → Edit the Excel file → Run `node scripts/excel-to-json.js file.xlsx`
2. **Add images** → Drop files into `public/images/products/{category}/`
3. **Update contact info** → Edit `src/data/config.json`
4. **Deploy** → Run `npm run build` and upload the `dist/` folder
