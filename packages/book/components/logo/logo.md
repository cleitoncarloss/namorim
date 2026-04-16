### `<nm-logo>`

**Objetivo**
Exibe o logotipo da aplicação.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o logo está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `value` — default `undefined`. Livre. O que controla na prática o valor associado ao componente, despachado no evento clicked.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `clicked` — Disparado ao clicar no logo, com o valor como detalhe.

**Use quando**
- Precisa exibir a marca da aplicação, geralmente com funcionalidade de clique.

**Não use quando**
- Precisa de uma imagem genérica → use `<img>` ou `<nm-icon>`.
