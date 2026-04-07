# Badge

Componente visual usado para exibir status, contadores, categorias ou labels de forma compacta.

## Uso

```html
<morph-badge color="warning">In progress</morph-badge>
<morph-badge color="primary">In review</morph-badge>
<morph-badge color="complete">Complete</morph-badge>
```

### Status de Tarefas

```html
<morph-badge color="warning">In progress</morph-badge>
<morph-badge color="primary">In review</morph-badge>
<morph-badge color="complete">Complete</morph-badge>
<morph-badge color="succeeded">Success</morph-badge>
<morph-badge color="danger">Error</morph-badge>
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
<morph-badge size="sm" color="primary">Small</morph-badge>
<morph-badge color="primary">Medium</morph-badge>
<morph-badge size="lg" color="primary">Large</morph-badge>
```

### Variante Pill

```html
<morph-badge variant="pill" color="primary">Pill Badge</morph-badge>
<morph-badge variant="pill" color="danger" size="sm">99+</morph-badge>
```

### Com Cores

```html
<morph-badge color="master">Master</morph-badge>
<morph-badge color="primary">Primary</morph-badge>
<morph-badge color="complete">Complete</morph-badge>
<morph-badge color="succeeded">Succeeded</morph-badge>
<morph-badge color="warning">Warning</morph-badge>
<morph-badge color="danger">Danger</morph-badge>
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
