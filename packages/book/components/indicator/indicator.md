### `<morph-indicator>`

**Objetivo**
Exibe um indicador visual de atividade ou estado.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o indicador está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — um texto opcional que acompanha o indicador (ex: "Loading...", "Thinking...").

**Eventos**
Nenhum.

**Use quando**
- Precisa mostrar ao usuário que um processo está em andamento.

**Não use quando**
- Precisa de um progresso exato → use uma barra de progresso.
