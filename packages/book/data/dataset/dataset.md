### `<morph-dataset>`

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
- Precisa de persistência de dados no servidor → use `<morph-fetch>` para interagir com APIs.
- Precisa de um único item de dados com busca exata → use `<x-find>`.
- Precisa filtrar dados com busca parcial → use `<morph-like>`.

## Características

- **Headless**: Não possui renderização visual
- **Storage em Map**: Armazena dados em memória usando Map nativo
- **Upsert**: Atualiza ou insere dados baseado em uma chave única
- **Eventos**: Dispara `changed` após modificações
- **Dataflow**: Integração via barramento de eventos com `morph-on`

## Sintaxe

```html
<morph-dataset upsert="id"></morph-dataset>
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

O componente é projetado para ser usado através do barramento de eventos com `morph-on`.

**IMPORTANTE**: O `morph-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Adicionando Dados

```html
<!-- Botão com dados no value -->
<morph-button value='{"name":"João","age":25}'>Adicionar João</morph-button>

<!-- Dataset com morph-on interno -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
```

### Removendo Dados

```html
<!-- Botão com ID a ser removido -->
<morph-button value="123">Remover</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
</morph-dataset>
```

### Resetted Dataset

```html
<morph-button>Limpar Tudo</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/resetted"></morph-on>
</morph-dataset>
```

### Reagindo às Mudanças

```html
<morph-dataset upsert="id"></morph-dataset>

<!-- morph-on é filho do morph-text (manipula o pai) -->
<morph-text value="">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
```

## Exemplos de Fluxos Completos

### Fluxo de Adição

```html
<!-- Botões que adicionam dados -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</morph-button>

<!-- Dataset -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>

<!-- Contador de itens -->
<morph-text value="0">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
```

### Fluxo de Atualização (Upsert)

```html
<!-- Primeiro clique adiciona, segundo clique atualiza -->
<morph-button value='{"id":1,"name":"João","age":25}'>João 25 anos</morph-button>
<morph-button value='{"id":1,"name":"João","age":26}'>João 26 anos</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
```

### Fluxo de Remoção

```html
<!-- Adiciona -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar</morph-button>

<!-- Remove pela chave -->
<morph-button value="1">Remover</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
</morph-dataset>
```

### Fluxo com Geração Automática de UUID

```html
<!-- Dados sem ID serão gerados automaticamente -->
<morph-button value='{"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"name":"Maria"}'>Adicionar Maria</morph-button>

<!-- UUID será criado e atribuído à propriedade 'key' -->
<morph-dataset upsert="key">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
```

### Fluxo com Múltiplos Dados

```html
<!-- Push aceita array de dados -->
<morph-button value='[{"id":1,"name":"João"},{"id":2,"name":"Maria"}]'>
  Adicionar Múltiplos
</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
```

### Fluxo Completo com Contador e Resetted

```html
<!-- Controles -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</morph-button>
<morph-button value="1">Remover João</morph-button>
<morph-button>Limpar Tudo</morph-button>

<!-- Dataset -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
  <morph-on value="morph-button/clicked:method/resetted"></morph-on>
</morph-dataset>

<!-- Contador -->
<morph-text value="0 itens">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
```

## Uso com Fetch

Combine `morph-dataset` com `morph-fetch` para armazenar dados de API:

```html
<!-- Botão que busca dados -->
<morph-button>Carregar Usuários</morph-button>

<!-- Fetch -->
<morph-fetch url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>

<!-- Dataset armazena os dados retornados -->
<morph-dataset upsert="id">
  <morph-on value="morph-fetch/success:method/push"></morph-on>
</morph-dataset>

<!-- Contador de usuários carregados -->
<morph-text value="0">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
```

## Transformando Dados com Filtros

Use filtros do `morph-on` para transformar os dados antes de armazenar:

```html
<morph-fetch url="https://api.example.com/users"></morph-fetch>

<morph-dataset upsert="id">
  <!-- Extrai apenas a propriedade 'data' do response -->
  <morph-on value="morph-fetch/success:method/push|prop=data"></morph-on>
</morph-dataset>

<morph-text value="">
  <!-- Conta quantos itens foram armazenados -->
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
```

## Comportamento de Upsert

O comportamento de upsert garante que:
- Se um dado com a mesma chave já existe, ele será **atualizado** (merge de propriedades)
- Se não existe, será **inserido** como novo registro
- Se o dado não possui a propriedade upsert, um UUID será gerado automaticamente

```html
<morph-dataset upsert="id"></morph-dataset>

<!-- Primeira chamada: adiciona {id:1, name:"João"} -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar</morph-button>

<!-- Segunda chamada: atualiza para {id:1, name:"João", age:25} -->
<morph-button value='{"id":1,"age":25}'>Atualizar</morph-button>
```
