### `<morph-fetch>`

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
- Precisa de gerenciamento de estado local para uma coleção de dados → use `<morph-dataset>`.
- Precisa apenas de um link para navegação → use `<morph-link>`.

## Características

- **Headless**: Não possui renderização visual
- **Métodos HTTP**: Suporta GET, POST, PUT, DELETE
- **Eventos**: Dispara `succeeded` e `errored` após requisições
- **Cancelamento**: Aborta requisições pendentes automaticamente
- **Interpolação**: Permite substituir variáveis na URL
- **Dataflow**: Integração via barramento de eventos com `morph-on`

## Sintaxe

```html
<morph-fetch url="/api/users/:id"></morph-fetch>
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

O componente é projetado para ser usado através do barramento de eventos com `morph-on`.

**IMPORTANTE**: O `morph-on` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Trigger de Requisição

```html
<!-- Botão que dispara o método get do fetch -->
<morph-button>Carregar Dados</morph-button>

<!-- morph-on é filho do fetch (manipula o pai) -->
<morph-fetch url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
```

### Passando Payload

```html
<!-- Botão com value que será passado como payload -->
<morph-button value='{"id":123}'>Buscar Usuário 123</morph-button>

<morph-fetch url="https://api.example.com/users/:id">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
```

### Reagindo ao Sucesso

```html
<morph-fetch url="https://api.example.com/users"></morph-fetch>

<!-- morph-on é filho do morph-text (manipula o pai) -->
<morph-text value="">
  <morph-on value="morph-fetch/succeeded:attribute/value|prop=name"></morph-on>
</morph-text>
```

### Reagindo ao Erro

```html
<morph-fetch url="https://api.example.com/invalid"></morph-fetch>

<morph-text value="">
  <morph-on value="morph-fetch/errored:attribute/value|always=Erro na requisição"></morph-on>
</morph-text>
```

## Exemplos de Fluxos Completos

### Fluxo de Leitura (GET)

```html
<!-- Botão trigger -->
<morph-button>Carregar</morph-button>

<!-- Fetch com morph-on interno -->
<morph-fetch url="https://api.example.com/data">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>

<!-- Exibição com morph-on interno -->
<morph-text value="Aguardando...">
  <morph-on value="morph-fetch/succeeded:attribute/value|prop=message"></morph-on>
  <morph-on value="morph-fetch/errored:attribute/value|always=Erro!"></morph-on>
</morph-text>
```

### Fluxo de Criação (POST)

```html
<!-- Botão com dados -->
<morph-button value='{"name":"João","email":"joao@example.com"}'>
  Criar Usuário
</morph-button>

<!-- Fetch -->
<morph-fetch url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/posted"></morph-on>
</morph-fetch>

<!-- Feedback -->
<morph-text value="">
  <morph-on value="morph-fetch/succeeded:attribute/value|always=Usuário criado!"></morph-on>
  <morph-on value="morph-fetch/errored:attribute/value|always=Erro ao criar"></morph-on>
</morph-text>
```

### Fluxo com Interpolação de URL

```html
<!-- Botão com ID no value -->
<morph-button value='{"id":123}'>Buscar Usuário 123</morph-button>

<!-- Fetch com URL parametrizada -->
<morph-fetch url="https://api.example.com/users/:id">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>

<!-- Resultado -->
<morph-text value="">
  <morph-on value="morph-fetch/succeeded:attribute/value|prop=name"></morph-on>
</morph-text>
```

### Fluxo de Deleção (DELETE)

```html
<!-- Botão de deletar -->
<morph-button value='{"id":123}' color="danger">Deletar</morph-button>

<!-- Fetch -->
<morph-fetch url="https://api.example.com/users/:id">
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
</morph-fetch>

<!-- Status -->
<morph-text value="">
  <morph-on value="morph-fetch/succeeded:attribute/value|always=Deletado com sucesso"></morph-on>
</morph-text>
```

## Cancelamento Automático

Requisições pendentes são automaticamente canceladas quando uma nova requisição é iniciada:

```html
<morph-button value='{"id":1}'>Usuário 1</morph-button>
<morph-button value='{"id":2}'>Usuário 2</morph-button>

<morph-fetch url="https://api.example.com/users/:id">
  <!-- Se clicar rápido nos dois botões, apenas a última requisição será completada -->
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
```

## Transformando Dados com Filtros

Use filtros do `morph-on` para transformar os dados recebidos:

```html
<morph-fetch url="https://api.example.com/users"></morph-fetch>

<morph-text value="">
  <!-- Extrai propriedade 'name' -->
  <morph-on value="morph-fetch/succeeded:attribute/value|prop=name"></morph-on>
</morph-text>

<morph-text value="">
  <!-- Conta quantos itens retornaram -->
  <morph-on value="morph-fetch/succeeded:attribute/value|len"></morph-on>
</morph-text>

<morph-text value="">
  <!-- Verifica se teve sucesso -->
  <morph-on value="morph-fetch/succeeded:attribute/value|always=Sucesso!"></morph-on>
</morph-text>
```