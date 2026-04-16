### `<nm-card>`

**Objetivo**
Exibe um bloco de conteúdo delimitado visualmente.

**Atributos**
- `direction` — default `column`. Valores: `column`, `row`, `column-reverse`, `row-reverse`. O que controla na prática a direção do flexbox.
- `height` — default `hug`. Livre. O que controla na prática a altura do card (hug=auto, fill=100%, ou valores em px/%).
- `hidden` — sem default. Livre. O que controla na prática se o card está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `variant` — default `filled`. Valores: `filled`, `outlined`. O que controla na prática a variante de estilo do card.
- `width` — default `hug`. Livre. O que controla na prática a largura do card (hug=auto, fill=100%, ou valores em px/%).

**Conteúdo**
- Aceita conteúdo interno — descreva o que pode ir (texto, quais componentes, etc.).

**Eventos**
Nenhum.

**Use quando**
- Precisa agrupar conteúdo relacionado.

**Não use quando**
- Precisa apenas de um container sem estilo → use `div`.
