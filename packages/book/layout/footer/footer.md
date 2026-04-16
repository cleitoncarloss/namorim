### `<nm-footer>`

**Objetivo**
Apresenta informações de rodapé, como links de navegação secundária ou direitos autorais.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o rodapé está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — descreva o que pode ir (texto, quais componentes, como links, etc.).

**Eventos**
Nenhum.

**Use quando**
- Precisa de uma seção de rodapé padrão para a aplicação.

**Não use quando**
- Precisa de um cabeçalho → use `<nm-header>`.
