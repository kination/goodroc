# goodroc (working in progress)

goodroc is a modern, high-performance Markdown wiki system that utilizes **Google Drive** as its Single Source of Truth (SSOT). It allows teams to manage technical documentation natively in Drive while providing a sleek, quick web interface.

## Motivation

Inspired by `docusaurus`(from Meta), goodroc aims to simplify how project knowledge is shared between teams and AI platforms.

- Streamlined Access: Accessing documentation from traditional sources like Confluence or GitHub via Gemini "Gems" can be cumbersome.
- Single Source of Truth (SSOT): By managing documentation natively in Google Drive, both your team and your Gemini chatbot share the same information as a single source of truth, making synchronization seamless.
- Bridging the Markdown Gap: While Google Drive integrates perfectly with Google Docs, it lacks first-class Markdown support. goodroc fills this gap by providing a sleek, premium interface that renders your Drive documents as a structured Markdown wiki.

## Tech Stack

- **Core:** SvelteKit (Svelte 5 with Runes)
- **Styling:** Tailwind CSS v4 & shadcn-svelte
- **Auth:** Google OAuth 2.0
- **Search:** WASM-based high-speed search skeleton
- **Productivity:** Oxc (oxlint/oxfmt) for ultra-fast linting and formatting

---

_Bridging Google Drive and AI-powered knowledge management._
