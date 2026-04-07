### `<morph-icon>`

**Objetivo**
Exibe um ícone do Material Symbols.

**Atributos**
- `color` — default `currentcolor`. Valores: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`, `info`. O que controla na prática a cor do ícone.
- `hidden` — sem default. Livre. O que controla na prática se o ícone está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).
- `use` — default `sem default`. Livre. O que controla na prática o nome do ícone Material Symbols.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `clicked` — Dispara quando o usuário clica no ícone.

**Use quando**
- Precisa de um elemento visual pequeno e simbólico para representar uma ação ou informação.

**Não use quando**
- Precisa de uma imagem mais complexa ou decorativa → use `<img>` ou `<morph-avatar>`.
