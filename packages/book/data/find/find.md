### `<x-find>`

**Objetivo**
Busca um único item em um dataset baseado em uma chave e valor exato.

**Atributos**
- `key` — sem default. Livre. Nome da propriedade a ser buscada no dataset (ex: `id`, `uuid`, `email`).
- `value` — sem default. Livre. Valor exato a ser buscado (geralmente definido via `morph-on`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `found` — Disparado após a busca. O `event.detail` contém o objeto encontrado (ou `undefined` se não encontrar).

**Use quando**
- Precisa localizar um único registro em um conjunto de dados por um critério exato.
- É um componente filho de `<morph-dataset>` e precisa interagir com seus dados.

**Não use quando**
- Precisa filtrar múltiplos resultados com busca parcial (like/contains) → use `<morph-like>`.

## Características

- **Headless**: Não possui renderização visual
- **Match Exato**: Busca valor exato (não parcial como o `morph-like`)
- **Único Resultado**: Retorna apenas o primeiro item encontrado
- **Filho de Dataset**: Deve ser filho direto de `morph-dataset` ou `x-dataset`
- **Eventos**: Dispara `found` com o resultado encontrado
- **Dataflow**: Integração via barramento de eventos com `morph-on`

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

O componente é projetado para ser usado através do barramento de eventos com `morph-on`.

### Busca por ID

```html
<!-- Botão com ID do usuário -->
<morph-button value="123">Buscar Usuário 123</morph-button>

<!-- Dataset com find interno -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="morph-button/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Exibe resultado -->
<morph-text value="">
  <morph-on value="users/found:attribute/value|prop=name"></morph-on>
</morph-text>
```

### Busca para Edição (Padrão CRUD)

Este é o padrão mais comum, usado no exemplo dataset.html:

```html
<!-- Lista de usuários com botão de editar -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-button name="edit" value="{id}" variant="outlined">
        <morph-icon use="edit"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<!-- Dataset com find -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <!-- Quando clicar em edit, busca o usuário pelo ID -->
    <morph-on value="edit/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Modal de edição -->
<morph-modal>
  <morph-render>
    <template>
      <morph-form name="update">
        <template>
          <morph-input name="id" value="{id}" hidden></morph-input>
          <morph-input name="name" value="{name}">
            <morph-label>Nome</morph-label>
          </morph-input>
          <morph-button>Salvar</morph-button>
        </template>
      </morph-form>
    </template>
    <!-- Renderiza o formulário com os dados encontrados -->
    <morph-on value="users/found:method/render"></morph-on>
  </morph-render>
  <!-- Abre o modal quando encontra -->
  <morph-on value="users/found:method/show"></morph-on>
</morph-modal>
```

## Exemplos de Fluxos Completos

### Busca e Exibição de Detalhes

```html
<!-- Botões com IDs -->
<morph-button value="1">Ver João</morph-button>
<morph-button value="2">Ver Maria</morph-button>

<!-- Adiciona dados -->
<morph-button value='{"id":"1","name":"João","age":25}'>
  Adicionar João
</morph-button>
<morph-button value='{"id":"2","name":"Maria","age":30}'>
  Adicionar Maria
</morph-button>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="morph-button/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</x-dataset>

<!-- Exibe detalhes -->
<morph-stack direction="column">
  <morph-text value="">
    <morph-on value="users/found:attribute/value|prop=name"></morph-on>
  </morph-text>
  <morph-text value="">
    <morph-on value="users/found:attribute/value|prop=age"></morph-on>
  </morph-text>
</morph-stack>
```

### Busca para Remoção Confirmada

```html
<!-- Lista com botões de deletar -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-button name="delete-request" value="{id}" color="error">
        <morph-icon use="delete"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="delete-request/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="delete-confirm/clicked:method/deleted"></morph-on>
</x-dataset>

<!-- Modal de confirmação -->
<morph-modal>
  <morph-card>
    <morph-stack direction="column">
      <morph-text value="">
        <morph-on value="users/found:attribute/value|prop=name"></morph-on>
      </morph-text>
      <morph-text>Confirma a exclusão?</morph-text>
      <morph-stack>
        <morph-button name="delete-confirm" color="error">
          <morph-on value="users/found:attribute/value|prop=id"></morph-on>
          Confirmar
        </morph-button>
        <morph-button variant="outlined">Cancelar</morph-button>
      </morph-stack>
    </morph-stack>
  </morph-card>
  <morph-on value="users/found:method/show"></morph-on>
  <morph-on value="delete-confirm/clicked:method/hidden"></morph-on>
</morph-modal>
```

## Diferença entre Found e Like

- **x-find**: Busca um único resultado com match exato
- **morph-like**: Filtra múltiplos resultados com busca parcial (contains)

```html
<!-- Found: retorna objeto com match exato -->
<x-find key="id" value="123"></x-find>
<!-- Resultado: {id:123, name:"João"} -->

<!-- Like: retorna array com todos que contêm "Jo" -->
<morph-like key="name" value="Jo"></morph-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->
```

## Uso Combinado com morph-render

O resultado de `found` pode ser usado para renderizar um formulário ou card de detalhes:

```html
<x-dataset name="products" upsert="id">
  <x-find key="id">
    <morph-on value="view/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Renderiza card de detalhes -->
<morph-render>
  <template>
    <morph-card>
      <morph-heading>{name}</morph-heading>
      <morph-text>Preço: R$ {price}</morph-text>
      <morph-text>Estoque: {stock}</morph-text>
    </morph-card>
  </template>
  <morph-on value="products/found:method/render"></morph-on>
</morph-render>
```

## Integração com Formulários

O padrão mais comum é usar `found` para preencher formulários de edição:

```html
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="edit/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="update/submitted:method/pushed"></morph-on>
</x-dataset>

<morph-render>
  <template>
    <morph-form name="update">
      <template>
        <!-- Campos preenchidos com valores do item encontrado -->
        <morph-input name="id" value="{id}" hidden></morph-input>
        <morph-input name="name" value="{name}"></morph-input>
        <morph-input name="email" value="{email}"></morph-input>
        <morph-button>Salvar</morph-button>
      </template>
    </morph-form>
  </template>
  <!-- Renderiza formulário quando encontrar -->
  <morph-on value="users/found:method/render"></morph-on>
</morph-render>
```