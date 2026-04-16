### `<nm-fetch>`

**Objetivo**
Facilita requisições HTTP através do barramento de eventos.

**Atributos**
- `url` — sem default. Livre. URL base para as requisições (suporta interpolação com `:parametro`).

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
- `succeeded` — Disparado quando a requisição é concluída com sucesso. O `event.detail` contém os dados da resposta.
- `errored` — Disparado quando a requisição falha. O `event.detail` contém informações do erro.

**Use quando**
- Precisa realizar requisições HTTP (GET, POST, PUT, DELETE) de forma declarativa e reativa.
- Integração com APIs externas para buscar, enviar ou manipular dados.

**Não use quando**
- Precisa de gerenciamento de estado local para uma coleção de dados → use `<nm-dataset>`.
- Precisa apenas de um link para navegação → use `<nm-link>`.

## Características

- **Headless**: Não possui renderização visual
- **Métodos HTTP**: Suporta GET, POST, PUT, DELETE
- **Eventos**: Dispara `succeeded` e `errored` após requisições
- **Cancelamento**: Aborta requisições pendentes automaticamente
- **Interpolação**: Permite substituir variáveis na URL
- **Dataflow**: Integração via barramento de eventos com `nm-on`

## Sintaxe

```html
<nm-fetch url="/api/users/:id"></nm-fetch>
```

## Métodos (Chamados via Dataflow)

### get(payload)
Executa uma requisição GET. O payload é usado para interpolação de parâmetros na URL.

### post(payload)
Executa uma requisição POST com o payload no corpo da requisição.

### put(payload)
Executa uma requisição PUT com o payload no corpo da requisição.

### delete(payload)
Executa uma requisição DELETE. O payload é usado para interpolação de parâmetros na URL.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com `nm-on`.

**IMPORTANTE**: O `nm-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Trigger de Requisição

```html
<!-- Botão que dispara o método get do fetch -->
<nm-button>Carregar Dados</nm-button>

<!-- nm-on é filho do fetch (manipula o pai) -->
<nm-fetch url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
```

### Passando Payload

```html
<!-- Botão com value que será passado como payload -->
<nm-button value='{"id":123}'>Buscar Usuário 123</nm-button>

<nm-fetch url="https://api.example.com/users/:id">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
```

### Reagindo ao Sucesso

```html
<nm-fetch url="https://api.example.com/users"></nm-fetch>

<!-- nm-on é filho do nm-text (manipula o pai) -->
<nm-text value="">
  <nm-on value="nm-fetch/succeeded:attribute/value|prop=name"></nm-on>
</nm-text>
```

### Reagindo ao Erro

```html
<nm-fetch url="https://api.example.com/invalid"></nm-fetch>

<nm-text value="">
  <nm-on value="nm-fetch/errored:attribute/value|always=Erro na requisição"></nm-on>
</nm-text>
```

## Exemplos de Fluxos Completos

### Fluxo de Leitura (GET)

```html
<!-- Botão trigger -->
<nm-button>Carregar</nm-button>

<!-- Fetch com nm-on interno -->
<nm-fetch url="https://api.example.com/data">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>

<!-- Exibição com nm-on interno -->
<nm-text value="Aguardando...">
  <nm-on value="nm-fetch/succeeded:attribute/value|prop=message"></nm-on>
  <nm-on value="nm-fetch/errored:attribute/value|always=Erro!"></nm-on>
</nm-text>
```

### Fluxo de Criação (POST)

```html
<!-- Botão com dados -->
<nm-button value='{"name":"João","email":"joao@example.com"}'>
  Criar Usuário
</nm-button>

<!-- Fetch -->
<nm-fetch url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/posted"></nm-on>
</nm-fetch>

<!-- Feedback -->
<nm-text value="">
  <nm-on value="nm-fetch/succeeded:attribute/value|always=Usuário criado!"></nm-on>
  <nm-on value="nm-fetch/errored:attribute/value|always=Erro ao criar"></nm-on>
</nm-text>
```

### Fluxo com Interpolação de URL

```html
<!-- Botão com ID no value -->
<nm-button value='{"id":123}'>Buscar Usuário 123</nm-button>

<!-- Fetch com URL parametrizada -->
<nm-fetch url="https://api.example.com/users/:id">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>

<!-- Resultado -->
<nm-text value="">
  <nm-on value="nm-fetch/succeeded:attribute/value|prop=name"></nm-on>
</nm-text>
```

### Fluxo de Deleção (DELETE)

```html
<!-- Botão de deletar -->
<nm-button value='{"id":123}' color="danger">Deletar</nm-button>

<!-- Fetch -->
<nm-fetch url="https://api.example.com/users/:id">
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
</nm-fetch>

<!-- Status -->
<nm-text value="">
  <nm-on value="nm-fetch/succeeded:attribute/value|always=Deletado com sucesso"></nm-on>
</nm-text>
```

## Cancelamento Automático

Requisições pendentes são automaticamente canceladas quando uma nova requisição é iniciada:

```html
<nm-button value='{"id":1}'>Usuário 1</nm-button>
<nm-button value='{"id":2}'>Usuário 2</nm-button>

<nm-fetch url="https://api.example.com/users/:id">
  <!-- Se clicar rápido nos dois botões, apenas a última requisição será completada -->
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
```

## Transformando Dados com Filtros

Use filtros do `nm-on` para transformar os dados recebidos:

```html
<nm-fetch url="https://api.example.com/users"></nm-fetch>

<nm-text value="">
  <!-- Extrai propriedade 'name' -->
  <nm-on value="nm-fetch/succeeded:attribute/value|prop=name"></nm-on>
</nm-text>

<nm-text value="">
  <!-- Conta quantos itens retornaram -->
  <nm-on value="nm-fetch/succeeded:attribute/value|len"></nm-on>
</nm-text>

<nm-text value="">
  <!-- Verifica se teve sucesso -->
  <nm-on value="nm-fetch/succeeded:attribute/value|always=Sucesso!"></nm-on>
</nm-text>
```