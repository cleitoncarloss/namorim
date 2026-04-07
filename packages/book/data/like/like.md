### `<morph-like>`

**Objetivo**
Filtra dados de um dataset baseado em uma busca parcial (like/contains).

**Atributos**
- `key` — sem default. Livre. Nome da propriedade a ser buscada no dataset (ex: `name`, `email`, `title`).
- `value` — default `''`. Livre. Valor a ser buscado (geralmente definido via `morph-on`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `liked` — Disparado após a busca. O `event.detail` contém um array com os itens encontrados. **Nota**: O nome do evento é `liked`. Anteriormente era `linke`.

**Use quando**
- Precisa implementar funcionalidades de busca em tempo real que filtram uma lista de dados.
- É um componente filho de `<morph-dataset>` e precisa realizar buscas parciais em seus dados.

**Não use quando**
- Precisa de um armazenamento de dados em memória sem funcionalidade de busca → use `<morph-dataset>`.
- Precisa buscar um único item com match exato → use `<x-find>`.

## Características

- **Headless**: Não possui renderização visual
- **Case Insensitive**: Busca não diferencia maiúsculas de minúsculas
- **Filtro Parcial**: Busca valores que contenham o texto digitado
- **Filho de Dataset**: Deve ser filho direto de `morph-dataset`
- **Eventos**: Dispara `liked` com os resultados filtrados
- **Dataflow**: Integração via barramento de eventos com `morph-on`

## Sintaxe

```html
<morph-dataset name="users" upsert="id">
  <morph-like key="name"></morph-like>
</morph-dataset>
```

## Comportamento

O componente filtra os valores armazenados no dataset pai, retornando todos os itens onde
o valor da propriedade especificada em `key` contém o texto especificado em `value`.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `morph-on`.

### Busca em Campo de Texto

```html
<!-- Input de busca -->
<morph-input name="search">
  <morph-label>Buscar por nome</morph-label>
</morph-input>

<!-- Dataset com morph-like interno -->
<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Exibe quantidade de resultados -->
<morph-text value="0 resultados">
  <morph-on value="users/liked:attribute/value|len"></morph-on>
</morph-text>
```

### Busca com Renderização de Resultados

```html
<morph-input name="search">
  <morph-label>Buscar usuários</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Renderiza apenas os resultados filtrados -->
<morph-render>
  <template>
    <morph-text>{name} - {email}</morph-text>
  </template>
  <morph-on value="users/liked:method/render"></morph-on>
</morph-render>
```

## Exemplos de Fluxos Completos

### Busca em Lista de Produtos

```html
<!-- Campo de busca -->
<morph-input name="search">
  <morph-label>Buscar produto</morph-label>
</morph-input>

<!-- Botões para adicionar produtos -->
<morph-button value='{"id":1,"name":"Notebook","price":3000}'>
  Adicionar Notebook
</morph-button>
<morph-button value='{"id":2,"name":"Mouse","price":50}'>
  Adicionar Mouse
</morph-button>
<morph-button value='{"id":3,"name":"Teclado","price":200}'>
  Adicionar Teclado
</morph-button>

<!-- Dataset com filtro -->
<morph-dataset name="products" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>

<!-- Renderiza resultados filtrados -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-text>R$ {price}</morph-text>
    </morph-stack>
  </template>
  <morph-on value="products/liked:method/render"></morph-on>
</morph-render>

<!-- Contador de resultados -->
<morph-text value="0 encontrados">
  <morph-on value="products/liked:attribute/value|len"></morph-on>
</morph-text>
```

### Busca com Debounce

```html
<!-- Input com delay -->
<morph-input name="search" debounce="300">
  <morph-label>Digite para buscar</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <morph-like key="email">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<morph-text value="Digite algo...">
  <morph-on value="users/liked:attribute/value|len"></morph-on>
</morph-text>
```

### Busca em Múltiplas Propriedades

Para buscar em múltiplas propriedades, use múltiplos `morph-like`:

```html
<morph-input name="search">
  <morph-label>Buscar</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <!-- Busca por nome -->
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>

  <!-- Busca por email -->
  <morph-like key="email">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>
```

## Diferença entre Like e Find

- **morph-like**: Filtra múltiplos resultados com busca parcial (contains)
- **morph-found**: Busca um único resultado com match exato

```html
<!-- Like: retorna array com todos que contêm "Jo" -->
<morph-like key="name" value="Jo"></morph-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->

<!-- Find: retorna objeto com match exato -->
<morph-found key="name" value="João"></morph-found>
<!-- Resultado: {name:"João"} -->
```

## Integração com morph-render

O resultado de `linke` pode ser usado diretamente com `morph-render`:

```html
<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Renderiza automaticamente os resultados filtrados -->
<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
    </morph-card>
  </template>
  <morph-on value="users/liked:method/render"></morph-on>
</morph-render>
```
