### `<morph-label>`

**Objetivo**
Fornece um rótulo textual para elementos de formulário, melhorando a acessibilidade e a usabilidade.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto.
- `hidden` — sem default. Livre. O que controla na prática se o label está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto do rótulo.

**Eventos**
Nenhum.

**Use quando**
- Precisa associar um texto descritivo a um campo de entrada (input, textarea, select), checkbox, ou radio button.

**Não use quando**
- Precisa de um texto de ajuda genérico → use `<morph-helper>`.
- Precisa de um título → use `<morph-heading>` ou `<morph-title>`.
