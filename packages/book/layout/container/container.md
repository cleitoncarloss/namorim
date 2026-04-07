### `<morph-container>`

**Objetivo**
Define uma área de conteúdo com largura máxima e centralizada para organizar o layout principal da página.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o container está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — o conteúdo a ser centralizado e limitado pela largura máxima.

**Eventos**
Nenhum.

**Use quando**
- Precisa de uma estrutura de layout principal para a página que garanta alinhamento e legibilidade em diferentes tamanhos de tela.

**Não use quando**
- Precisa de um agrupamento flexível de elementos sem restrições de largura → use `<morph-stack>`.
- Precisa de um container com padding interno negativo → use `<morph-inset>`.
