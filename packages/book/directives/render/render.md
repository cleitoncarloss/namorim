### `<morph-render>`

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
- Integração com `morph-dataset` ou `morph-fetch` para exibir dados.

**Não use quando**
- Precisa apenas exibir um único bloco de texto ou elemento estático.

## Características

- **Renderização Dinâmica**: Renderiza templates com interpolação de dados
- **Interpolação**: Suporta `{propriedade}` e `{objeto.propriedade}`
- **Layouts Responsivos**: Suporta layouts list e grid
- **Batch Rendering**: Aceita arrays de dados para renderização em lote
- **Template Interno**: Usa `<template>` interno ou referência externa via atributo
- **Dataflow**: Integração via barramento de eventos com `morph-on`

## Sintaxe

```html
<morph-render layout="list">
  <template>
    <morph-text>{name}</morph-text>
  </template>
</morph-render>
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
  <morph-text>{name} - {age} anos</morph-text>
  <morph-text>Cidade: {address.city}</morph-text>
</template>
```

## Layouts

### List Layout (Padrão)

Layout vertical com flex column, ideal para listas e formulários.

```html
<morph-render layout="list">
  <template>
    <morph-card>
      <morph-text>{title}</morph-text>
    </morph-card>
  </template>
</morph-render>
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
<morph-render layout="grid">
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
    </morph-card>
  </template>
</morph-render>
```

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `morph-on`.

**IMPORTANTE**: O `morph-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Renderizando Dados de um Dataset

```html
<!-- Dataset com dados -->
<morph-dataset name="users" upsert="id"></morph-dataset>

<!-- Render com morph-on interno -->
<morph-render>
  <template>
    <morph-text>{name} - {age} anos</morph-text>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>
```

### Renderizando Dados de um Fetch

```html
<!-- Botão trigger -->
<morph-button>Carregar Usuários</morph-button>

<!-- Fetch -->
<morph-fetch name="api" url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>

<!-- Render -->
<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
      <morph-text>{email}</morph-text>
    </morph-card>
  </template>
  <morph-on value="api/succeeded:method/render"></morph-on>
</morph-render>
```

## Exemplos de Fluxos Completos

### Fluxo Simples de Lista

```html
<!-- Botão que adiciona dados -->
<morph-button value='[{"name":"João"},{"name":"Maria"}]'>
  Renderizar Lista
</morph-button>

<!-- Render -->
<morph-render>
  <template>
    <morph-text>{name}</morph-text>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
```

### Fluxo com Dataset (CRUD Completo)

```html
<!-- Botões de controle -->
<morph-button value='{"id":1,"name":"João","age":25}'>
  Adicionar João
</morph-button>

<!-- Dataset -->
<morph-dataset name="users" upsert="id">
  <morph-on value="morph-button/clicked:method/push"></morph-on>
</morph-dataset>

<!-- Render automático quando dataset muda -->
<morph-render layout="list">
  <template>
    <morph-stack width="fill">
      <morph-text>{name} - {age} anos</morph-text>
      <morph-button value="{id}" color="error">
        <morph-icon use="delete"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<!-- Botão de deletar é conectado ao dataset -->
<morph-dataset name="users" upsert="id">
  <morph-on value="morph-button/clicked:method/delete"></morph-on>
</morph-dataset>
```

### Fluxo com Grid Responsivo

```html
<morph-button value='[
  {"id":1,"name":"Produto 1","price":"R$ 100"},
  {"id":2,"name":"Produto 2","price":"R$ 200"},
  {"id":3,"name":"Produto 3","price":"R$ 300"}
]'>Renderizar Produtos</morph-button>

<morph-render layout="grid">
  <template>
    <morph-card>
      <morph-heading size="xs">{name}</morph-heading>
      <morph-text>{price}</morph-text>
      <morph-button value="{id}" width="fill">Comprar</morph-button>
    </morph-card>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
```

### Fluxo com Interpolação Aninhada

```html
<morph-button value='[
  {"name":"João","address":{"city":"São Paulo","state":"SP"}},
  {"name":"Maria","address":{"city":"Rio de Janeiro","state":"RJ"}}
]'>Renderizar Endereços</morph-button>

<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
      <morph-text>{address.city} - {address.state}</morph-text>
    </morph-card>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
```

## Uso com Template Externo

Ao invés de template interno, você pode referenciar um template externo:

```html
<!-- Template externo no documento -->
<template id="user-template">
  <morph-text>{name}</morph-text>
</template>

<!-- Render referenciando o template -->
<morph-render template="user-template">
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>
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

Cada renderização sobrescreve a anterior. Para adicionar itens incrementalmente, use `morph-dataset`.
