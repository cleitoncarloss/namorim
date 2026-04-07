# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Namorim** é um aplicativo de namoro estilo Tinder, construído com Lit HTML e backend Supabase.

## Build & Development Commands

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção (output: dist/)
npm run build

# Preview do build de produção
npm run preview
```

## Architecture

### Tech Stack
- **Frontend:** Lit HTML + Vite (JavaScript, sem TypeScript)
- **Backend:** Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Runtime:** Node.js (npm)

### Project Structure
```
src/
├── main.js           # Entry point - componente raiz AppRoot
├── style.css         # Global styles
├── services/         # Serviços de negócio
│   └── supabase.js   # Supabase client initialization
├── domain/           # Lógica de domínio
│   ├── utils.js
│   └── validators.js
└── constants/        # Constantes da aplicação
    ├── errors.js
    └── index.js
```

### Component Structure
Componentes são criados como Custom Elements usando Lit:
```javascript
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  static styles = css`/* component styles */`;

  render() {
    return html`<!-- component template -->`;
  }
}

customElements.define('my-component', MyComponent);
```

### Authentication Flow
1. Login via magic link (email) do Supabase
2. Estado de sessão é gerenciado nos serviços
3. Perfil é criado automaticamente no primeiro login (tabela `profiles`)
4. Usuários novos são redirecionados para completar perfil

### Database Tables (Supabase)
- `profiles` - Perfis de usuários (id, username, bio, avatar_url, is_premium)
- Tabelas de likes/matches (inferidas pelo contexto da aplicação)

## Specs
- `specs/namorim-spec.md` - Funcionalidades e requisitos do produto
- `specs/technology-spec.md` - Decisões técnicas da stack
