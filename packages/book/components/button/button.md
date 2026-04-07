### `<nm-button>`

**Objetivo**
Representa uma ação na interface com suporte a múltiplas cores e variantes de estilo.

**Atributos**
- `color` — default `primary`. Valores:
  - `primary` — Teal (#14B8A6). Cor principal do design system.
  - `complete` — Azul (#3B82F6). Para ações completadas.
  - `succeeded` — Verde (#10B981). Para sucesso e validações positivas.
  - `warning` — Âmbar (#F59E0B). Para avisos.
  - `danger` — Vermelho (#EF4444). Para ações destrutivas.
  - `info` — Ciano (#06B6D4). Para informações.
- `disabled` — sem default. Boolean. Desabilita o botão.
- `hidden` — sem default. Boolean. Oculta o elemento.
- `icononly` — default `false`. Boolean. Botão quadrado (40px) para conter apenas ícone.
- `on` — sem default. String. Binding de eventos no formato `source/event:target/action` (mixin Echo).
- `type` — default `submit`. Valores: `submit`, `reset`. Tipo do botão em formulários.
- `value` — sem default. String. Valor enviado no evento `clicked`.
- `variant` — default `filled`. Valores:
  - `filled` — Fundo sólido com cor.
  - `outlined` — Apenas borda, fundo transparente.
  - `tonal` — Fundo claro com cor principal.
  - `text` — Apenas texto, sem borda ou fundo.
- `width` — default `100%`. String. Largura do botão (px, %, auto).

**Conteúdo**
- Aceita conteúdo interno — texto ou ícones (<nm-icon>).

**Eventos**
- `clicked` — Dispara quando o usuário clica no componente, com `detail` contendo o valor.

**Tokens de Cor**
Todos os tokens de cor estão em `@packages/pixel/tokens/color/color.css` com variações:
- `-darker`: Cabeçalhos e destaques
- `-dark`: Hover state
- (base): Estado padrão
- `-light`: Detalhes leves
- `-lighter`: Fundos claros

**Use quando**
- Precisa de uma ação na interface.
- Quer destacar ações com significados diferentes (sucesso, perigo, aviso).

**Não use quando**
- Precisa de um link para outra página → use `<nm-link>`.
- Precisa de múltiplas opções agrupadas → use `<nm-button-group>`.

---

## Exemplos Práticos

### Todas as Cores (Variant Filled)

```html
<nm-button color="primary">Primary</nm-button>
<nm-button color="complete">Complete</nm-button>
<nm-button color="succeeded">Succeeded</nm-button>
<nm-button color="warning">Warning</nm-button>
<nm-button color="danger">Danger</nm-button>
<nm-button color="info">Info</nm-button>
```

### Todas as Variantes (Color Primary)

```html
<nm-button variant="filled" color="primary">Filled</nm-button>
<nm-button variant="outlined" color="primary">Outlined</nm-button>
<nm-button variant="tonal" color="primary">Tonal</nm-button>
<nm-button variant="text" color="primary">Text</nm-button>
```

### Filled × Cores

```html
<nm-button color="primary" variant="filled">Primary Filled</nm-button>
<nm-button color="complete" variant="filled">Complete Filled</nm-button>
<nm-button color="succeeded" variant="filled">Succeeded Filled</nm-button>
<nm-button color="warning" variant="filled">Warning Filled</nm-button>
<nm-button color="danger" variant="filled">Danger Filled</nm-button>
<nm-button color="info" variant="filled">Info Filled</nm-button>
```

### Outlined × Cores

```html
<nm-button color="primary" variant="outlined">Primary Outlined</nm-button>
<nm-button color="complete" variant="outlined">Complete Outlined</nm-button>
<nm-button color="succeeded" variant="outlined">Succeeded Outlined</nm-button>
<nm-button color="warning" variant="outlined">Warning Outlined</nm-button>
<nm-button color="danger" variant="outlined">Danger Outlined</nm-button>
<nm-button color="info" variant="outlined">Info Outlined</nm-button>
```

### Tonal × Cores

```html
<nm-button color="primary" variant="tonal">Primary Tonal</nm-button>
<nm-button color="complete" variant="tonal">Complete Tonal</nm-button>
<nm-button color="succeeded" variant="tonal">Succeeded Tonal</nm-button>
<nm-button color="warning" variant="tonal">Warning Tonal</nm-button>
<nm-button color="danger" variant="tonal">Danger Tonal</nm-button>
<nm-button color="info" variant="tonal">Info Tonal</nm-button>
```

### Text × Cores

```html
<nm-button color="primary" variant="text">Primary Text</nm-button>
<nm-button color="complete" variant="text">Complete Text</nm-button>
<nm-button color="succeeded" variant="text">Succeeded Text</nm-button>
<nm-button color="warning" variant="text">Warning Text</nm-button>
<nm-button color="danger" variant="text">Danger Text</nm-button>
<nm-button color="info" variant="text">Info Text</nm-button>
```

### Estados

```html
<!-- Desabilitado -->
<nm-button disabled>Desabilitado</nm-button>
<nm-button color="danger" disabled>Deletar</nm-button>

<!-- Oculto -->
<nm-button hidden>Oculto</nm-button>

<!-- Largura Customizada -->
<nm-button width="200px">Largura 200px</nm-button>
<nm-button width="50%">Largura 50%</nm-button>
```

### Icon Only

```html
<nm-button icononly color="primary">
  <nm-icon>favorite</nm-icon>
</nm-button>

<nm-button icononly color="danger">
  <nm-icon>delete</nm-icon>
</nm-button>

<nm-button icononly color="succeeded" variant="outlined">
  <nm-icon>check_circle</nm-icon>
</nm-button>

<nm-button icononly color="warning" variant="tonal">
  <nm-icon>warning</nm-icon>
</nm-button>
```

### Em Formulários

```html
<form>
  <nm-input type="email" placeholder="Email"></nm-input>
  <nm-button type="submit" color="primary">Entrar</nm-button>
  <nm-button type="reset" variant="text">Limpar</nm-button>
</form>
```

### Com Evento Click

```html
<nm-button 
  on="*/click:method/handleClick"
  color="primary"
>
  Clique em Mim
</nm-button>
```

### Grupo de Ações

```html
<div style="display: flex; gap: 12px;">
  <nm-button color="succeeded" variant="filled">Salvar</nm-button>
  <nm-button color="warning" variant="outlined">Cancelar</nm-button>
  <nm-button color="danger" variant="text">Deletar</nm-button>
</div>
```

### Dialog de Confirmação

```html
<div style="display: flex; gap: 8px; justify-content: flex-end;">
  <nm-button variant="text" color="secondary">Cancelar</nm-button>
  <nm-button color="danger">Excluir Perfil</nm-button>
</div>
```
