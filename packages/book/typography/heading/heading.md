### `<morph-heading>`

**Objetivo**
Exibe títulos e subtítulos de seções, com diferentes níveis de hierarquia visual.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto do heading.
- `color` — default `master`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`. O que controla na prática a cor do texto do heading.
- `hidden` — sem default. Livre. O que controla na prática se o heading está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto do título.

**Eventos**
Nenhum.

**Use quando**
- Precisa criar títulos para seções de conteúdo, artigos, ou cards, indicando hierarquia.

**Não use quando**
- Precisa de um texto de parágrafo → use `<morph-text>`.
- Precisa de um título de página principal → use `<morph-title>`.
