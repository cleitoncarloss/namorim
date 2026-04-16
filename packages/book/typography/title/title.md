### `<nm-title>`

**Objetivo**
Exibe o título principal da página ou de uma seção de destaque.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do título.
- `hidden` — sem default. Livre. O que controla na prática se o título está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto do título.

**Eventos**
Nenhum.

**Use quando**
- Precisa de um título de destaque que represente o conteúdo principal da página ou uma seção importante.

**Não use quando**
- Precisa de um subtítulo ou título de seção menor → use `<nm-heading>`.
- Precisa de um texto comum → use `<nm-text>`.
