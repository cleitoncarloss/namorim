### `<nm-like>`

**Objetivo**
Filtra dados de um dataset baseado em uma busca parcial (like/contains).

**Atributos**
- `key` — sem default. Livre. Nome da propriedade a ser buscada no dataset (ex: `name`, `email`, `title`).
- `value` — default `''`. Livre. Valor a ser buscado (geralmente definido via `nm-on`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `liked` — Disparado após a busca. O `event.detail` contém um array com os itens encontrados. **Nota**: O nome do evento é `liked`. Anteriormente era `linke`.

**Use quando**
- Precisa implementar funcionalidades de busca em tempo real que filtram uma lista de dados.
- É um componente filho de `<nm-dataset>` e precisa realizar buscas parciais em seus dados.

**Não use quando**
- Precisa de um armazenamento de dados em memória sem funcionalidade de busca → use `<nm-dataset>`.
- Precisa buscar um único item com match exato → use `<x-find>`.

## Características

- **Headless**: Não possui renderização visual
- **Case Insensitive**: Busca não diferencia maiúsculas de minúsculas
- **Filtro Parcial**: Busca valores que contenham o texto digitado
- **Filho de Dataset**: Deve ser filho direto de `nm-dataset`
- **Eventos**: Dispara `liked` com os resultados filtrados
- **Dataflow**: Integração via barramento de eventos com `nm-on`

## Sintaxe

```html
<nm-dataset name="users" upsert="id">
  <nm-like key="name"></nm-like>
</nm-dataset>
```

## Comportamento

O componente filtra os valores armazenados no dataset pai, retornando todos os itens onde
o valor da propriedade especificada em `key` contém o texto especificado em `value`.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `nm-on`.

### Busca em Campo de Texto

```html
<!-- Input de busca -->
<nm-input name="search">
  <nm-label>Buscar por nome</nm-label>
</nm-input>

<!-- Dataset com nm-like interno -->
<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Exibe quantidade de resultados -->
<nm-text value="0 resultados">
  <nm-on value="users/liked:attribute/value|len"></nm-on>
</nm-text>
```

### Busca com Renderização de Resultados

```html
<nm-input name="search">
  <nm-label>Buscar usuários</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Renderiza apenas os resultados filtrados -->
<nm-render>
  <template>
    <nm-text>{name} - {email}</nm-text>
  </template>
  <nm-on value="users/liked:method/render"></nm-on>
</nm-render>
```

## Exemplos de Fluxos Completos

### Busca em Lista de Produtos

```html
<!-- Campo de busca -->
<nm-input name="search">
  <nm-label>Buscar produto</nm-label>
</nm-input>

<!-- Botões para adicionar produtos -->
<nm-button value='{"id":1,"name":"Notebook","price":3000}'>
  Adicionar Notebook
</nm-button>
<nm-button value='{"id":2,"name":"Mouse","price":50}'>
  Adicionar Mouse
</nm-button>
<nm-button value='{"id":3,"name":"Teclado","price":200}'>
  Adicionar Teclado
</nm-button>

<!-- Dataset com filtro -->
<nm-dataset name="products" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>

<!-- Renderiza resultados filtrados -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-text>R$ {price}</nm-text>
    </nm-stack>
  </template>
  <nm-on value="products/liked:method/render"></nm-on>
</nm-render>

<!-- Contador de resultados -->
<nm-text value="0 encontrados">
  <nm-on value="products/liked:attribute/value|len"></nm-on>
</nm-text>
```

### Busca com Debounce

```html
<!-- Input com delay -->
<nm-input name="search" debounce="300">
  <nm-label>Digite para buscar</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <nm-like key="email">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<nm-text value="Digite algo...">
  <nm-on value="users/liked:attribute/value|len"></nm-on>
</nm-text>
```

### Busca em Múltiplas Propriedades

Para buscar em múltiplas propriedades, use múltiplos `nm-like`:

```html
<nm-input name="search">
  <nm-label>Buscar</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <!-- Busca por nome -->
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>

  <!-- Busca por email -->
  <nm-like key="email">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>
```

## Diferença entre Like e Find

- **nm-like**: Filtra múltiplos resultados com busca parcial (contains)
- **nm-found**: Busca um único resultado com match exato

```html
<!-- Like: retorna array com todos que contêm "Jo" -->
<nm-like key="name" value="Jo"></nm-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->

<!-- Find: retorna objeto com match exato -->
<nm-found key="name" value="João"></nm-found>
<!-- Resultado: {name:"João"} -->
```

## Integração com nm-render

O resultado de `linke` pode ser usado diretamente com `nm-render`:

```html
<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Renderiza automaticamente os resultados filtrados -->
<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
    </nm-card>
  </template>
  <nm-on value="users/liked:method/render"></nm-on>
</nm-render>
```
