# Badge

Componente visual usado para exibir status, contadores, categorias ou labels de forma compacta.

## Uso

```html
<nm-badge color="warning">In progress</nm-badge>
<nm-badge color="primary">In review</nm-badge>
<nm-badge color="complete">Complete</nm-badge>
```

### Status de Tarefas

```html
<nm-badge color="warning">In progress</nm-badge>
<nm-badge color="primary">In review</nm-badge>
<nm-badge color="complete">Complete</nm-badge>
<nm-badge color="succeeded">Success</nm-badge>
<nm-badge color="danger">Error</nm-badge>
```

## Propriedades

### color
Define a cor do badge através do mixin Color.
- **Tipo**: `string`
- **Valores**: `master`, `primary`, `complete`, `succeeded`, `warning`, `danger`
- **Padrão**: `primary`

### size
Define o tamanho do badge.
- **Tipo**: `string`
- **Valores**: `sm`, `md`, `lg`
- **Padrão**: `md`

### variant
Define a variante visual do badge.
- **Tipo**: `string`
- **Valores**: `default`, `pill`
- **Padrão**: `default`

### hidden
Oculta o elemento (mixin Hidden).
- **Tipo**: `boolean`
- **Padrão**: `false`

## Características Visuais

- 🎨 **Fundo claro tonal**: Usa a variação `-lighter` da cor para fundos suaves
- 📝 **Texto escuro contrastante**: Usa a variação `-darker` da mesma cor para alto contraste
- 🌈 **Harmonia cromática**: Fundo e texto da mesma família de cor
- 📐 **Padding generoso**: Mais espaço horizontal para conforto visual
- 🎯 **Font semibold**: Peso de fonte mais forte para destaque
- 🔠 **Capitalização automática**: Texto formatado automaticamente

## Exemplos

### Tamanhos

```html
<nm-badge size="sm" color="primary">Small</nm-badge>
<nm-badge color="primary">Medium</nm-badge>
<nm-badge size="lg" color="primary">Large</nm-badge>
```

### Variante Pill

```html
<nm-badge variant="pill" color="primary">Pill Badge</nm-badge>
<nm-badge variant="pill" color="danger" size="sm">99+</nm-badge>
```

### Com Cores

```html
<nm-badge color="master">Master</nm-badge>
<nm-badge color="primary">Primary</nm-badge>
<nm-badge color="complete">Complete</nm-badge>
<nm-badge color="succeeded">Succeeded</nm-badge>
<nm-badge color="warning">Warning</nm-badge>
<nm-badge color="danger">Danger</nm-badge>
```

## Design Tokens Utilizados

### Cores Tonais
- `--color-{variant}-lighter`: Cor de fundo (tom claro para fundos suaves)
- `--color-{variant}-darker`: Cor do texto (tom escuro para alto contraste)

Exemplo para cada variante:
- **danger**: Fundo `--color-danger-lighter` + Texto `--color-danger-darker`
- **warning**: Fundo `--color-warning-lighter` + Texto `--color-warning-darker`
- **primary**: Fundo `--color-primary-lighter` + Texto `--color-primary-darker`
- **complete**: Fundo `--color-complete-lighter` + Texto `--color-complete-darker`
- **succeeded**: Fundo `--color-succeeded-lighter` + Texto `--color-succeeded-darker`

### Tipografia e Espaçamento
- `--font-family-base`: Família tipográfica
- `--font-size-xxxs/xxs/xs`: Tamanhos de fonte
- `--font-weight-semibold`: Peso da fonte (semibold para melhor legibilidade)
- `--line-height-sm`: Altura de linha
- `--border-radius-sm/pill`: Raio de borda
- `--spacing-nano/xxxs/xxs/xs/sm/md`: Espaçamentos internos

## Mixins

- **Color**: Gerencia cores através de atributos
- **Echo**: Sistema de eventos reativos
- **Hidden**: Controla visibilidade
