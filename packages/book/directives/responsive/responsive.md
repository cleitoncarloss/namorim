### `<morph-responsive>`

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
  <morph-responsive media="(max-width: 768px)" hidden></morph-responsive>
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
<morph-responsive media="(max-width: 768px)" hidden></morph-responsive>

<!-- Desktop Only: mostra apenas em desktop -->
<morph-responsive media="(min-width: 769px)" data-visible="true"></morph-responsive>

<!-- Tablet Range: aplica em tablets -->
<morph-responsive media="(min-width: 481px) and (max-width: 768px)" data-device="tablet"></morph-responsive>

<!-- Portrait Orientation -->
<morph-responsive media="(orientation: portrait)" data-layout="vertical"></morph-responsive>

<!-- High DPI Screens -->
<morph-responsive media="(min-resolution: 2dppx)" data-quality="high"></morph-responsive>
```

## Combinação com Outros Componentes

```html
<morph-button>
  Clique aqui
  <morph-responsive media="(max-width: 768px)" disabled></morph-responsive>
</morph-button>

<morph-text value="Desktop">
  <morph-responsive media="(max-width: 768px)" value="Mobile"></morph-responsive>
</morph-text>
```
