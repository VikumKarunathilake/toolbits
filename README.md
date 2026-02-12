# ToolBits

ToolBits is an open-source collection of free, browser-based utilities for developers, designers, and productivity workflows.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Live site:** [https://toolbits.vercel.app](https://toolbits.vercel.app)

## Table of Contents

- [Why ToolBits](#why-toolbits)
- [Feature Set](#feature-set)
  - [Developer Utilities](#developer-utilities)
  - [Productivity & Security](#productivity--security)
  - [Design & Multimedia](#design--multimedia)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Roadmap Ideas](#roadmap-ideas)
- [License](#license)

## Why ToolBits

ToolBits is designed to be a practical toolbox you can open in any browser without installation or account setup. The project emphasizes:

- **Useful tools for daily work** (formatting, decoding, parsing, conversion)
- **Fast and clean UX** with a responsive interface
- **Open-source collaboration** so anyone can improve or extend the tools

## Feature Set

### Developer Utilities

- **JSON Formatter**: Format and validate JSON data
- **JWT Decoder**: Decode JSON Web Tokens to view claims
- **Unix Timestamp Converter**: Convert timestamps to human-readable dates and vice-versa
- **Base64 Converter**: Encode and decode Base64 strings
- **URL Encoder/Decoder**: Percent-encode or decode URLs
- **UUID Generator**: Generate random UUIDs (v4)
- **Meta Tag Generator**: Create SEO-friendly meta tags
- **Key Code Tester**: Identify JavaScript key codes and events
- **Regex Tester**: Test regular expressions against text (built-in JavaScript engine)
- **Cron Parser**: Explain and schedule cron expressions
- **SQL Formatter**: Prettify SQL queries
- **XML Formatter**: Format and indent XML strings
- **YAML to JSON**: Convert YAML to JSON and JSON to YAML

### Productivity & Security

- **Pomodoro Timer**: Focus timer with custom intervals
- **Stopwatch**: Precise stopwatch with lap tracking
- **Password Generator**: Create secure, random passwords with custom rules
- **Word Counter**: Count words, characters, and paragraphs
- **Lorem Ipsum Generator**: Generate placeholder text

### Design & Multimedia

- **Color Converter**: Convert between HEX, RGB, HSL, and CMYK
- **QR Code Generator**: Create QR codes for URLs and text
- **Case Converter**: Switch text between camelCase, snake_case, etc.
- **SVG Optimizer**: Minify and optimize SVG code

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Turbopack)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Radix/shadcn-style UI component architecture
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications

## Getting Started

### Prerequisites

- **Node.js 20+**
- **pnpm** (recommended)

### Installation

```bash
git clone https://github.com/VikumKarunathilake/toolbits.git
cd toolbits
pnpm install
```

### Run in Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` — Start local development server
- `pnpm build` — Create production build
- `pnpm start` — Run production server
- `pnpm lint` — Run ESLint checks

## Project Structure

```text
app/            Next.js route segments and tool pages
components/     Shared UI components and reusable primitives
lib/            Shared utility helpers
public/         Static assets
```

## Contributing

Contributions are very welcome ❤️

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run checks locally (`pnpm lint`, etc.).
5. Open a pull request with clear context/screenshots when relevant.

Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for contributor workflow details.

## Roadmap Ideas

Potential future improvements:

- More utility tools and categories
- Better i18n/accessibility coverage
- Offline-first support for selected utilities
- Improved test coverage for tool logic

If you want to work on any of these, open an issue or PR discussion.

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for full text.
