### `<morph-inset>`

**Objetivo**
Cria um espaçamento negativo (margin) para que o conteúdo interno se estenda além do padding do seu elemento pai.

**Atributos**
- `direction` — default `column`. Valores: `column`, `row`. O que controla na prática a direção do flex layout dos elementos internos.
- `height` — default `hug`. Livre. O que controla na prática a altura do inset (hug=auto, fill=100%, ou valores em px/%).
- `hidden` — sem default. Livre. O que controla na prática se o inset está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `side` — default `all`. Valores: `all`, `top`, `right`, `bottom`, `left`, `x`, `y`. O que controla na prática o(s) lado(s) do inset onde aplicar margem negativa.
- `width` — default `fill`. Livre. O que controla na prática a largura do inset (hug=auto, fill=100%, ou valores em px/%).

**Conteúdo**
- Aceita conteúdo interno — o conteúdo que será "encaixado" no layout.

**Eventos**
Nenhum.

**Use quando**
- Precisa que um elemento filho "invada" o padding do elemento pai, como uma imagem que vai de ponta a ponta dentro de um card com padding.

**Não use quando**
- Precisa apenas de espaçamento interno normal → use `padding` via CSS ou um container.
