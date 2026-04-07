### `<morph-text>`

**Objetivo**
Exibe um bloco de texto formatado.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto.
- `color` — default `master`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`. O que controla na prática a cor do texto.
- `hidden` — sem default. Livre. O que controla na prática se o texto está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o texto a ser exibido.

**Eventos**
Nenhum.

**Use quando**
- Precisa exibir parágrafos de texto, descrições, ou qualquer conteúdo textual genérico.

**Não use quando**
- Precisa de um título → use `<morph-heading>` ou `<morph-title>`.
- Precisa de uma legenda → use `<morph-caption>`.
- Precisa de um rótulo de formulário → use `<morph-label>`.
