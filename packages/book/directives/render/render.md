### `<nm-render>`

**Objetivo**
Renderiza dinamicamente conteúdo baseado em templates e dados.

**Atributos**
- `layout` — default `list`. Valores: `list`, `grid`. O que controla na prática o layout de renderização.
- `template` — sem default. Livre. O que controla na prática o ID de um template externo (alternativa ao template interno).

**Conteúdo**
- Aceita conteúdo interno — o elemento `<template>` que define a estrutura a ser renderizada.

**Eventos**
Nenhum.

**Use quando**
- Precisa renderizar listas de itens ou blocos de conteúdo repetitivos de forma dinâmica.
- Necessita de layouts responsivos para a exibição de coleções de dados.
- Integração com `nm-dataset` ou `nm-fetch` para exibir dados.

**Não use quando**
- Precisa apenas exibir um único bloco de texto ou elemento estático.

## Características

- **Renderização Dinâmica**: Renderiza templates com interpolação de dados
- **Interpolação**: Suporta `{propriedade}` e `{objeto.propriedade}`
- **Layouts Responsivos**: Suporta layouts list e grid
- **Batch Rendering**: Aceita arrays de dados para renderização em lote
- **Template Interno**: Usa `<template>` interno ou referência externa via atributo
- **Dataflow**: Integração via barramento de eventos com `nm-on`

## Sintaxe

```html
<nm-render layout="list">
  <template>
    <nm-text>{name}</nm-text>
  </template>
</nm-render>
```

## Métodos (Chamados via Dataflow)

### render(payload)
Renderiza o template com os dados fornecidos. Aceita um objeto único ou array de objetos.

```javascript
// Objeto único
render({ name: "João", age: 25 })

// Array de objetos
render([
  { name: "João", age: 25 },
  { name: "Maria", age: 30 }
])
```

## Interpolação

O sistema de interpolação suporta:

- **Propriedades simples**: `{name}`, `{age}`, `{id}`
- **Propriedades aninhadas**: `{user.name}`, `{address.city}`
- **Valor completo**: `{}` retorna o objeto inteiro

```html
<template>
  <nm-text>{name} - {age} anos</nm-text>
  <nm-text>Cidade: {address.city}</nm-text>
</template>
```

## Layouts

### List Layout (Padrão)

Layout vertical com flex column, ideal para listas e formulários.

```html
<nm-render layout="list">
  <template>
    <nm-card>
      <nm-text>{title}</nm-text>
    </nm-card>
  </template>
</nm-render>
```

### Grid Layout

Layout responsivo em grid que se adapta ao tamanho do container:
- < 480px: 1 coluna
- 480px+: 2 colunas
- 720px+: 3 colunas
- 960px+: 4 colunas
- 1200px+: 5 colunas
- 1440px+: 6 colunas

```html
<nm-render layout="grid">
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
    </nm-card>
  </template>
</nm-render>
```

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `nm-on`.

**IMPORTANTE**: O `nm-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Renderizando Dados de um Dataset

```html
<!-- Dataset com dados -->
<nm-dataset name="users" upsert="id"></nm-dataset>

<!-- Render com nm-on interno -->
<nm-render>
  <template>
    <nm-text>{name} - {age} anos</nm-text>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>
```

### Renderizando Dados de um Fetch

```html
<!-- Botão trigger -->
<nm-button>Carregar Usuários</nm-button>

<!-- Fetch -->
<nm-fetch name="api" url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>

<!-- Render -->
<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
      <nm-text>{email}</nm-text>
    </nm-card>
  </template>
  <nm-on value="api/succeeded:method/render"></nm-on>
</nm-render>
```

## Exemplos de Fluxos Completos

### Fluxo Simples de Lista

```html
<!-- Botão que adiciona dados -->
<nm-button value='[{"name":"João"},{"name":"Maria"}]'>
  Renderizar Lista
</nm-button>

<!-- Render -->
<nm-render>
  <template>
    <nm-text>{name}</nm-text>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
```

### Fluxo com Dataset (CRUD Completo)

```html
<!-- Botões de controle -->
<nm-button value='{"id":1,"name":"João","age":25}'>
  Adicionar João
</nm-button>

<!-- Dataset -->
<nm-dataset name="users" upsert="id">
  <nm-on value="nm-button/clicked:method/push"></nm-on>
</nm-dataset>

<!-- Render automático quando dataset muda -->
<nm-render layout="list">
  <template>
    <nm-stack width="fill">
      <nm-text>{name} - {age} anos</nm-text>
      <nm-button value="{id}" color="error">
        <nm-icon use="delete"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<!-- Botão de deletar é conectado ao dataset -->
<nm-dataset name="users" upsert="id">
  <nm-on value="nm-button/clicked:method/delete"></nm-on>
</nm-dataset>
```

### Fluxo com Grid Responsivo

```html
<nm-button value='[
  {"id":1,"name":"Produto 1","price":"R$ 100"},
  {"id":2,"name":"Produto 2","price":"R$ 200"},
  {"id":3,"name":"Produto 3","price":"R$ 300"}
]'>Renderizar Produtos</nm-button>

<nm-render layout="grid">
  <template>
    <nm-card>
      <nm-heading size="xs">{name}</nm-heading>
      <nm-text>{price}</nm-text>
      <nm-button value="{id}" width="fill">Comprar</nm-button>
    </nm-card>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
```

### Fluxo com Interpolação Aninhada

```html
<nm-button value='[
  {"name":"João","address":{"city":"São Paulo","state":"SP"}},
  {"name":"Maria","address":{"city":"Rio de Janeiro","state":"RJ"}}
]'>Renderizar Endereços</nm-button>

<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
      <nm-text>{address.city} - {address.state}</nm-text>
    </nm-card>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
```

## Uso com Template Externo

Ao invés de template interno, você pode referenciar um template externo:

```html
<!-- Template externo no documento -->
<template id="user-template">
  <nm-text>{name}</nm-text>
</template>

<!-- Render referenciando o template -->
<nm-render template="user-template">
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>
```

## Performance

- A renderização usa `requestAnimationFrame` para otimizar a atualização do DOM
- Templates são processados uma vez e reutilizados
- A interpolação é feita via `Function` para performance máxima

## Comportamento de Array

Quando um array é passado para `render()`, cada item é renderizado usando o template:

```javascript
// Array com 3 itens gera 3 elementos renderizados
render([
  { name: "João" },
  { name: "Maria" },
  { name: "Pedro" }
])
```

Cada renderização sobrescreve a anterior. Para adicionar itens incrementalmente, use `nm-dataset`.
