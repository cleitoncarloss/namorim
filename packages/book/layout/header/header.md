### `<nm-header>`

**Objetivo**
Exibe um cabeçalho de página, tipicamente contendo título e ações.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o cabeçalho está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o conteúdo principal do cabeçalho (ex: `<nm-text>`, `<nm-logo>`).
- Aceita slot nomeado `actions` — descreva o que vai dentro usando `slot="actions"` (ex: `<nm-button>`).

**Eventos**
Nenhum.

**Use quando**
- Precisa de um cabeçalho de página para navegação principal ou branding.

**Não use quando**
- Precisa de um rodapé → use `<nm-footer>`.
