### `<morph-caption>`

**Objetivo**
Exibe texto de legenda, geralmente menor e com estilo diferenciado para informações auxiliares.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto.
- `color` — default `master`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`. O que controla na prática a cor do texto.
- `hidden` — sem default. Livre. O que controla na prática se o caption está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto da legenda.

**Eventos**
Nenhum.

**Use quando**
- Precisa de um texto curto para descrever uma imagem, gráfico ou outra parte do conteúdo.
- Necessita de um texto secundário ou auxiliar, com hierarquia visual menor que um texto normal.

**Não use quando**
- Precisa de um texto principal ou um parágrafo longo → use `<morph-text>`.
- Precisa de um título ou subtítulo → use `<morph-heading>` ou `<morph-title>`.
