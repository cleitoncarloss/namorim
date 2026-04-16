### `<nm-responsive>`

**Objetivo**
Aplica atributos ao elemento pai baseado em media queries.

**Atributos**
- `media` — sem default. Livre. Media query CSS que será avaliada. Quando a query corresponde, todos os atributos (exceto on, is, class, style e media) são copiados para o elemento pai.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
Nenhum.

**Use quando**
- Precisa alterar atributos do elemento pai (como `hidden`, `disabled`, `data-*`) dinamicamente com base em condições de mídia (tamanho da tela, orientação, etc.).

**Não use quando**
- Precisa de componentes que renderizam conteúdo visual por si só.

## Uso

```html
<div>
  <nm-responsive media="(max-width: 768px)" hidden></nm-responsive>
</div>
```

## Funcionamento

1. Escuta mudanças no atributo `media`
2. Avalia a media query usando `window.matchMedia()`
3. Se a query corresponde, copia todos os atributos permitidos para o elemento pai
4. Re-avalia automaticamente quando a janela é redimensionada (evento resize)

## Atributos Ignorados

Os seguintes atributos nunca são copiados para o elemento pai:
- `on` - Eventos
- `is` - Customized built-in elements
- `class` - Classes CSS
- `style` - Estilos inline
- `media` - A própria media query

## Exemplos de Media Queries

```html
<!-- Mobile First: esconde em mobile -->
<nm-responsive media="(max-width: 768px)" hidden></nm-responsive>

<!-- Desktop Only: mostra apenas em desktop -->
<nm-responsive media="(min-width: 769px)" data-visible="true"></nm-responsive>

<!-- Tablet Range: aplica em tablets -->
<nm-responsive media="(min-width: 481px) and (max-width: 768px)" data-device="tablet"></nm-responsive>

<!-- Portrait Orientation -->
<nm-responsive media="(orientation: portrait)" data-layout="vertical"></nm-responsive>

<!-- High DPI Screens -->
<nm-responsive media="(min-resolution: 2dppx)" data-quality="high"></nm-responsive>
```

## Combinação com Outros Componentes

```html
<nm-button>
  Clique aqui
  <nm-responsive media="(max-width: 768px)" disabled></nm-responsive>
</nm-button>

<nm-text value="Desktop">
  <nm-responsive media="(max-width: 768px)" value="Mobile"></nm-responsive>
</nm-text>
```
