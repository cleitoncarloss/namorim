### `<nm-helper>`

**Objetivo**
Fornece texto de ajuda ou informações contextuais para elementos da interface.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto.
- `color` — default `master`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`. O que controla na prática a cor do texto de ajuda.
- `hidden` — sem default. Livre. O que controla na prática se o helper está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto de ajuda.

**Eventos**
Nenhum.

**Use quando**
- Precisa fornecer dicas ou informações adicionais para o usuário.

**Não use quando**
- Precisa de um texto principal ou título → use `<nm-text>` ou `<nm-heading>`.
