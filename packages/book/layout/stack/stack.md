### `<morph-stack>`

**Objetivo**
Organiza elementos em uma pilha (vertical ou horizontal) com espaçamento consistente.

**Atributos**
- `align` — default `start`. Valores: `start`, `center`, `end`, `stretch`. O que controla na prática o alinhamento dos itens no eixo transversal.
- `direction` — default `row`. Valores: `row`, `column`. O que controla na prática a direção do flex (row ou column).
- `height` — default `hug`. Livre. O que controla na prática a altura do stack (hug=auto, fill=100%, ou valores em px/%).
- `hidden` — sem default. Livre. O que controla na prática se o stack está oculto.
- `justify` — default `flex-start`. Valores: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`. O que controla na prática a justificativa do conteúdo no eixo principal.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `width` — default `hug`. Livre. O que controla na prática a largura do stack (hug=auto, fill=100%, ou valores em px/%).

**Conteúdo**
- Aceita conteúdo interno — os elementos a serem organizados na pilha.

**Eventos**
Nenhum.

**Use quando**
- Precisa organizar um grupo de elementos em uma única direção (linha ou coluna) com controle de espaçamento e alinhamento.

**Não use quando**
- Precisa de um layout de grade mais complexo → use CSS Grid diretamente.
