### `<nm-dataset>`

**Objetivo**
Gerencia uma coleção de dados em memória com operações de CRUD.

**Atributos**
- `upsert` — sem default. Livre. Nome da propriedade a ser usada como chave única (ex: `id`, `uuid`, `key`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `changed` — Disparado após qualquer modificação (push, delete, resetted). O `event.detail` contém o array completo de valores atuais.

**Use quando**
- Precisa de um armazenamento de dados em memória para gerenciar coleções de itens.
- Necessita de operações CRUD (Criar, Ler, Atualizar, Deletar) para itens em uma lista.
- Integração com outros componentes via dataflow para atualizar listas ou formulários.

**Não use quando**
- Precisa de persistência de dados no servidor → use `<nm-fetch>` para interagir com APIs.
- Precisa de um único item de dados com busca exata → use `<x-find>`.
- Precisa filtrar dados com busca parcial → use `<nm-like>`.

## Características

- **Headless**: Não possui renderização visual
- **Storage em Map**: Armazena dados em memória usando Map nativo
- **Upsert**: Atualiza ou insere dados baseado em uma chave única
- **Eventos**: Dispara `changed` após modificações
- **Dataflow**: Integração via barramento de eventos com `nm-on`

## Sintaxe

```html
<nm-dataset upsert="id"></nm-dataset>
```

## Propriedades

### value
Retorna um array com todos os valores armazenados no dataset.

## Métodos (Chamados via Dataflow)

### push(data)
Adiciona ou atualiza dados no dataset. Se o dado contém a propriedade definida em `upsert`, atualiza o registro existente. Caso contrário, cria um novo com UUID gerado.

### delete(key)
Remove um registro do dataset usando a chave especificada.

### resetted()
Limpa todos os dados do dataset.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `nm-on`.

**IMPORTANTE**: O `nm-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Adicionando Dados

```html
<!-- Botão com dados no value -->
<nm-button value='{"name":"João","age":25}'>Adicionar João</nm-button>

<!-- Dataset com nm-on interno -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
```

### Removendo Dados

```html
<!-- Botão com ID a ser removido -->
<nm-button value="123">Remover</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
</nm-dataset>
```

### Resetted Dataset

```html
<nm-button>Limpar Tudo</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/resetted"></nm-on>
</nm-dataset>
```

### Reagindo às Mudanças

```html
<nm-dataset upsert="id"></nm-dataset>

<!-- nm-on é filho do nm-text (manipula o pai) -->
<nm-text value="">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
```

## Exemplos de Fluxos Completos

### Fluxo de Adição

```html
<!-- Botões que adicionam dados -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</nm-button>

<!-- Dataset -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>

<!-- Contador de itens -->
<nm-text value="0">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
```

### Fluxo de Atualização (Upsert)

```html
<!-- Primeiro clique adiciona, segundo clique atualiza -->
<nm-button value='{"id":1,"name":"João","age":25}'>João 25 anos</nm-button>
<nm-button value='{"id":1,"name":"João","age":26}'>João 26 anos</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
```

### Fluxo de Remoção

```html
<!-- Adiciona -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar</nm-button>

<!-- Remove pela chave -->
<nm-button value="1">Remover</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
</nm-dataset>
```

### Fluxo com Geração Automática de UUID

```html
<!-- Dados sem ID serão gerados automaticamente -->
<nm-button value='{"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"name":"Maria"}'>Adicionar Maria</nm-button>

<!-- UUID será criado e atribuído à propriedade 'key' -->
<nm-dataset upsert="key">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
```

### Fluxo com Múltiplos Dados

```html
<!-- Push aceita array de dados -->
<nm-button value='[{"id":1,"name":"João"},{"id":2,"name":"Maria"}]'>
  Adicionar Múltiplos
</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
```

### Fluxo Completo com Contador e Resetted

```html
<!-- Controles -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</nm-button>
<nm-button value="1">Remover João</nm-button>
<nm-button>Limpar Tudo</nm-button>

<!-- Dataset -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
  <nm-on value="nm-button/clicked:method/resetted"></nm-on>
</nm-dataset>

<!-- Contador -->
<nm-text value="0 itens">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
```

## Uso com Fetch

Combine `nm-dataset` com `nm-fetch` para armazenar dados de API:

```html
<!-- Botão que busca dados -->
<nm-button>Carregar Usuários</nm-button>

<!-- Fetch -->
<nm-fetch url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>

<!-- Dataset armazena os dados retornados -->
<nm-dataset upsert="id">
  <nm-on value="nm-fetch/success:method/push"></nm-on>
</nm-dataset>

<!-- Contador de usuários carregados -->
<nm-text value="0">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
```

## Transformando Dados com Filtros

Use filtros do `nm-on` para transformar os dados antes de armazenar:

```html
<nm-fetch url="https://api.example.com/users"></nm-fetch>

<nm-dataset upsert="id">
  <!-- Extrai apenas a propriedade 'data' do response -->
  <nm-on value="nm-fetch/success:method/push|prop=data"></nm-on>
</nm-dataset>

<nm-text value="">
  <!-- Conta quantos itens foram armazenados -->
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
```

## Comportamento de Upsert

O comportamento de upsert garante que:
- Se um dado com a mesma chave já existe, ele será **atualizado** (merge de propriedades)
- Se não existe, será **inserido** como novo registro
- Se o dado não possui a propriedade upsert, um UUID será gerado automaticamente

```html
<nm-dataset upsert="id"></nm-dataset>

<!-- Primeira chamada: adiciona {id:1, name:"João"} -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar</nm-button>

<!-- Segunda chamada: atualiza para {id:1, name:"João", age:25} -->
<nm-button value='{"id":1,"age":25}'>Atualizar</nm-button>
```
