### `<morph-hgroup>`

**Objetivo**
Agrupa um conjunto de elementos de cabeçalho (como `<morph-heading>` e `<morph-text>`) para semântica e estilização coesa.

**Atributos**
- `align` — default `start`. Valores: `start`, `center`, `end`. O que controla na prática o alinhamento dos elementos filhos no eixo vertical.
- `hidden` — sem default. Livre. O que controla na prática se o hgroup está oculto.
- `width` — default `hug`. Livre. O que controla na prática a largura do hgroup (hug=auto, fill=100%, ou valores em px/%).

**Conteúdo**
- Aceita conteúdo interno — elementos de tipografia, como `<morph-heading>` e `<morph-text>`.

**Eventos**
Nenhum.

**Use quando**
- Precisa agrupar um título e um subtítulo, ou um título e um parágrafo introdutório, com alinhamento e espaçamento específicos.

**Não use quando**
- Precisa de um único elemento de texto → use `<morph-text>`, `<morph-heading>` ou `<morph-title>`.
