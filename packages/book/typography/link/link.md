### `<morph-link>`

**Objetivo**
Cria um link navegável que pode ser estilizado.

**Atributos**
- `align` — default `left`. Valores: `left`, `center`, `right`. O que controla na prática o alinhamento do texto do link.
- `color` — default `primary`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`. O que controla na prática a cor do texto do link.
- `hidden` — sem default. Livre. O que controla na prática se o link está oculto.
- `href` — default `#`. Livre. O que controla na prática a URL de destino.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `size` — default `xxs`. Valores: `xxxs`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`, `display`, `giant`. O que controla na prática o tamanho do texto do link.

**Conteúdo**
- Aceita conteúdo interno — o texto ou elementos visuais que compõem o link.

**Eventos**
Nenhum (o clique é tratado internamente para navegação).

**Use quando**
- Precisa de um elemento clicável para navegar para outra rota ou seção da página.

**Não use quando**
- Precisa de um elemento para disparar uma ação sem navegação → use `<morph-button>`.
