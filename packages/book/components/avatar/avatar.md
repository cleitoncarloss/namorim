### `<nm-avatar>`

**Objetivo**
Exibe uma imagem de avatar.

**Atributos**
- `alt` — default `Avatar`. Livre. O que controla na prática o texto alternativo para a imagem.
- `hidden` — sem default. Livre. O que controla na prática se o avatar está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `src` — sem default. Livre. O que controla na prática a URL da imagem.
- `value` — sem default. Livre. O que controla na prática o valor enviado no evento clicked.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `clicked` — Dispara quando o usuário clica no avatar.

**Use quando**
- Precisa exibir a imagem de um usuário.

**Não use quando**
- Precisa exibir um ícone → use `<nm-icon>`.
