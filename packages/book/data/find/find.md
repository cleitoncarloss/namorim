### `<x-find>`

**Objetivo**
Busca um único item em um dataset baseado em uma chave e valor exato.

**Atributos**
- `key` — sem default. Livre. Nome da propriedade a ser buscada no dataset (ex: `id`, `uuid`, `email`).
- `value` — sem default. Livre. Valor exato a ser buscado (geralmente definido via `nm-on`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `found` — Disparado após a busca. O `event.detail` contém o objeto encontrado (ou `undefined` se não encontrar).

**Use quando**
- Precisa localizar um único registro em um conjunto de dados por um critério exato.
- É um componente filho de `<nm-dataset>` e precisa interagir com seus dados.

**Não use quando**
- Precisa filtrar múltiplos resultados com busca parcial (like/contains) → use `<nm-like>`.

## Características

- **Headless**: Não possui renderização visual
- **Match Exato**: Busca valor exato (não parcial como o `nm-like`)
- **Único Resultado**: Retorna apenas o primeiro item encontrado
- **Filho de Dataset**: Deve ser filho direto de `nm-dataset` ou `x-dataset`
- **Eventos**: Dispara `found` com o resultado encontrado
- **Dataflow**: Integração via barramento de eventos com `nm-on`

## Sintaxe

```html
<x-dataset name="users" upsert="id">
  <x-find key="id"></x-find>
</x-dataset>
```

## Comportamento

O componente busca nos valores armazenados no dataset pai, retornando o primeiro item
onde o valor da propriedade especificada em `key` é exatamente igual ao `value`.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `nm-on`.

### Busca por ID

```html
<!-- Botão com ID do usuário -->
<nm-button value="123">Buscar Usuário 123</nm-button>

<!-- Dataset com find interno -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="nm-button/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Exibe resultado -->
<nm-text value="">
  <nm-on value="users/found:attribute/value|prop=name"></nm-on>
</nm-text>
```

### Busca para Edição (Padrão CRUD)

Este é o padrão mais comum, usado no exemplo dataset.html:

```html
<!-- Lista de usuários com botão de editar -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-button name="edit" value="{id}" variant="outlined">
        <nm-icon use="edit"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<!-- Dataset com find -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <!-- Quando clicar em edit, busca o usuário pelo ID -->
    <nm-on value="edit/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Modal de edição -->
<nm-modal>
  <nm-render>
    <template>
      <nm-form name="update">
        <template>
          <nm-input name="id" value="{id}" hidden></nm-input>
          <nm-input name="name" value="{name}">
            <nm-label>Nome</nm-label>
          </nm-input>
          <nm-button>Salvar</nm-button>
        </template>
      </nm-form>
    </template>
    <!-- Renderiza o formulário com os dados encontrados -->
    <nm-on value="users/found:method/render"></nm-on>
  </nm-render>
  <!-- Abre o modal quando encontra -->
  <nm-on value="users/found:method/show"></nm-on>
</nm-modal>
```

## Exemplos de Fluxos Completos

### Busca e Exibição de Detalhes

```html
<!-- Botões com IDs -->
<nm-button value="1">Ver João</nm-button>
<nm-button value="2">Ver Maria</nm-button>

<!-- Adiciona dados -->
<nm-button value='{"id":"1","name":"João","age":25}'>
  Adicionar João
</nm-button>
<nm-button value='{"id":"2","name":"Maria","age":30}'>
  Adicionar Maria
</nm-button>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="nm-button/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</x-dataset>

<!-- Exibe detalhes -->
<nm-stack direction="column">
  <nm-text value="">
    <nm-on value="users/found:attribute/value|prop=name"></nm-on>
  </nm-text>
  <nm-text value="">
    <nm-on value="users/found:attribute/value|prop=age"></nm-on>
  </nm-text>
</nm-stack>
```

### Busca para Remoção Confirmada

```html
<!-- Lista com botões de deletar -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-button name="delete-request" value="{id}" color="error">
        <nm-icon use="delete"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="delete-request/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="delete-confirm/clicked:method/deleted"></nm-on>
</x-dataset>

<!-- Modal de confirmação -->
<nm-modal>
  <nm-card>
    <nm-stack direction="column">
      <nm-text value="">
        <nm-on value="users/found:attribute/value|prop=name"></nm-on>
      </nm-text>
      <nm-text>Confirma a exclusão?</nm-text>
      <nm-stack>
        <nm-button name="delete-confirm" color="error">
          <nm-on value="users/found:attribute/value|prop=id"></nm-on>
          Confirmar
        </nm-button>
        <nm-button variant="outlined">Cancelar</nm-button>
      </nm-stack>
    </nm-stack>
  </nm-card>
  <nm-on value="users/found:method/show"></nm-on>
  <nm-on value="delete-confirm/clicked:method/hidden"></nm-on>
</nm-modal>
```

## Diferença entre Found e Like

- **x-find**: Busca um único resultado com match exato
- **nm-like**: Filtra múltiplos resultados com busca parcial (contains)

```html
<!-- Found: retorna objeto com match exato -->
<x-find key="id" value="123"></x-find>
<!-- Resultado: {id:123, name:"João"} -->

<!-- Like: retorna array com todos que contêm "Jo" -->
<nm-like key="name" value="Jo"></nm-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->
```

## Uso Combinado com nm-render

O resultado de `found` pode ser usado para renderizar um formulário ou card de detalhes:

```html
<x-dataset name="products" upsert="id">
  <x-find key="id">
    <nm-on value="view/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Renderiza card de detalhes -->
<nm-render>
  <template>
    <nm-card>
      <nm-heading>{name}</nm-heading>
      <nm-text>Preço: R$ {price}</nm-text>
      <nm-text>Estoque: {stock}</nm-text>
    </nm-card>
  </template>
  <nm-on value="products/found:method/render"></nm-on>
</nm-render>
```

## Integração com Formulários

O padrão mais comum é usar `found` para preencher formulários de edição:

```html
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="edit/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="update/submitted:method/pushed"></nm-on>
</x-dataset>

<nm-render>
  <template>
    <nm-form name="update">
      <template>
        <!-- Campos preenchidos com valores do item encontrado -->
        <nm-input name="id" value="{id}" hidden></nm-input>
        <nm-input name="name" value="{name}"></nm-input>
        <nm-input name="email" value="{email}"></nm-input>
        <nm-button>Salvar</nm-button>
      </template>
    </nm-form>
  </template>
  <!-- Renderiza formulário quando encontrar -->
  <nm-on value="users/found:method/render"></nm-on>
</nm-render>
```