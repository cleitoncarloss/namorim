# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Namorim** é um aplicativo de namoro estilo Tinder, construído como uma SPA React com backend Supabase.

## Build & Development Commands

```bash
# Instalar dependências
bun install

# Servidor de desenvolvimento (http://localhost:5173)
bun run dev

# Build de produção (output: dist/)
bun run build

# Preview do build de produção
bun run preview
```

## Architecture

### Tech Stack
- **Frontend:** React 19 + Vite (JavaScript/JSX, sem TypeScript)
- **Backend:** Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Runtime:** Bun

### Project Structure
```
src/
├── main.jsx          # Entry point
├── App.jsx           # Root component (session/profile management, routing)
├── style.css         # Global styles
├── services/
│   └── supabase.js   # Supabase client initialization
├── pages/            # Page-level components
│   ├── Auth.jsx      # Login (magic link)
│   ├── Home.jsx      # Discovery/swipe interface
│   ├── Matches.jsx   # Lista de matches
│   ├── Chat.jsx      # Chat com match
│   ├── Account.jsx   # Perfil do usuário
│   ├── LikesYou.jsx  # Quem curtiu (premium)
│   └── GoPremium.jsx # Upgrade para premium
└── components/       # Reusable components
    ├── Avatar.jsx
    ├── ProfileCard.jsx
    └── MatchNotification.jsx
```

### Routing
A navegação é gerenciada via state em `App.jsx` usando `view` e `setView`. Não há react-router - a troca de páginas ocorre via:
```jsx
setView({ name: 'matches' })
setView({ name: 'chat', partner: partnerObject })
```

### Authentication Flow
1. Login via magic link (email) do Supabase
2. `App.jsx` monitora `onAuthStateChange` para atualizar sessão
3. Perfil é criado automaticamente no primeiro login (tabela `profiles`)
4. Usuários novos são redirecionados para `Account` para completar perfil

### Database Tables (Supabase)
- `profiles` - Perfis de usuários (id, username, bio, avatar_url, is_premium)
- Tabelas de likes/matches (inferidas pelo contexto da aplicação)

## Specs
- `specs/namorim-spec.md` - Funcionalidades e requisitos do produto
- `specs/technology-spec.md` - Decisões técnicas da stack
