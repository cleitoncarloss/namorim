import './fetch.ts'

export default {
  title: 'Data/Fetch',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-fetch\` é uma diretiva headless que facilita requisições HTTP através do barramento de eventos.

## Características

- **Headless**: Não possui renderização visual
- **Métodos HTTP**: Suporta GET, POST, PUT, DELETE
- **Eventos**: Dispara \`succeeded\` e \`errored\` após requisições
- **Cancelamento**: Aborta requisições pendentes automaticamente
- **Interpolação**: Permite substituir variáveis na URL
- **Dataflow**: Integração via barramento de eventos com \`nm-on\`

## Sintaxe

\`\`\`html
<nm-fetch url="/api/users/:id"></nm-fetch>
\`\`\`

## Atributos

- **url**: URL base para as requisições (suporta interpolação com \`:parametro\`)

## Métodos (Chamados via Dataflow)

### get(payload)
Executa uma requisição GET. O payload é usado para interpolação de parâmetros na URL.

### post(payload)
Executa uma requisição POST com o payload no corpo da requisição.

### put(payload)
Executa uma requisição PUT com o payload no corpo da requisição.

### delete(payload)
Executa uma requisição DELETE. O payload é usado para interpolação de parâmetros na URL.

## Eventos

### succeeded
Disparado quando a requisição é concluída com sucesso. O \`event.detail\` contém os dados da resposta. Evento foi renomeado de "success" para "succeeded".

### errored
Disparado quando a requisição falha. O \`event.detail\` contém informações do erro. Evento foi renomeado de "error" para "errored".

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`nm-on\`.

**IMPORTANTE**: O \`nm-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Trigger de Requisição

\`\`\`html
<!-- Botão que dispara o método get do fetch -->
<nm-button>Carregar Dados</nm-button>

<!-- nm-on é filho do fetch (manipula o pai) -->
<nm-fetch url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
\`\`\`

### Passando Payload

\`\`\`html
<!-- Botão com value que será passado como payload -->
<nm-button value='{"id":123}'>Buscar Usuário 123</nm-button>

<nm-fetch url="https://api.example.com/users/:id">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
\`\`\`

### Reagindo ao Sucesso

\`\`\`html
<nm-fetch url="https://api.example.com/users"></nm-fetch>

<!-- nm-on é filho do nm-text (manipula o pai) -->
<nm-text value="">
  <nm-on value="nm-fetch/succeeded:attribute/value|prop=name"></nm-on>
</nm-text>
\`\`\`

### Reagindo ao Erro

\`\`\`html
<nm-fetch url="https://api.example.com/invalid"></nm-fetch>

<nm-text value="">
  <nm-on value="nm-fetch/errored:attribute/value|always=Erro na requisição"></nm-on>
</nm-text>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo de Leitura (GET)

\`\`\`html
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
\`\`\`

### Fluxo de Criação (POST)

\`\`\`html
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
\`\`\`

### Fluxo com Interpolação de URL

\`\`\`html
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
\`\`\`

### Fluxo de Deleção (DELETE)

\`\`\`html
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
\`\`\`

## Cancelamento Automático

Requisições pendentes são automaticamente canceladas quando uma nova requisição é iniciada:

\`\`\`html
<nm-button value='{"id":1}'>Usuário 1</nm-button>
<nm-button value='{"id":2}'>Usuário 2</nm-button>

<nm-fetch url="https://api.example.com/users/:id">
  <!-- Se clicar rápido nos dois botões, apenas a última requisição será completada -->
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>
\`\`\`

## Transformando Dados com Filtros

Use filtros do \`nm-on\` para transformar os dados recebidos:

\`\`\`html
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
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'URL base para as requisições HTTP (suporta interpolação)',
    },
  },
}

export const CepSearch = {
  name: 'Busca de CEP (ViaCEP)',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 500px;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Consulta de Endereço por CEP</div>
        <div class="story-description">
          Exemplo real de integração com API externa (ViaCEP). Digite um CEP válido
          (ex: 01310100) e os campos serão preenchidos automaticamente. Demonstra uso
          de nm-fetch com tratamento de sucesso e erro.
        </div>

        <nm-form>
          <template>
            <nm-input name="cep" required>
              <nm-label>CEP</nm-label>
              <nm-validity state="valueMissing">CEP é obrigatório</nm-validity>
            </nm-input>

            <nm-input name="estado" readonly>
              <nm-label>Estado</nm-label>
              <nm-on value="api/succeeded:attribute/value|prop=estado"></nm-on>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-input name="cidade" readonly>
              <nm-label>Cidade</nm-label>
              <nm-on value="api/succeeded:attribute/value|prop=localidade"></nm-on>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-input name="bairro" readonly>
              <nm-label>Bairro</nm-label>
              <nm-on value="api/succeeded:attribute/value|prop=bairro"></nm-on>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-input name="rua" readonly>
              <nm-label>Rua</nm-label>
              <nm-on value="api/succeeded:attribute/value|prop=logradouro"></nm-on>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-input name="numero" required>
              <nm-label>Número</nm-label>
              <nm-validity state="valueMissing">Número é obrigatório</nm-validity>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-input name="complemento">
              <nm-label>Complemento</nm-label>
              <nm-on value="api/errored:method/resetted"></nm-on>
            </nm-input>

            <nm-button width="fill">Enviar</nm-button>
            <nm-button variant="outlined" type="resetted" width="fill">Limpar</nm-button>
          </template>
        </nm-form>

        <nm-fetch name="api" url="https://viacep.com.br/ws/{}/json">
          <nm-on value="cep/changed:method/get"></nm-on>
        </nm-fetch>
      </div>
    `
    return container
  },
}

export const SimpleGetRequest = {
  name: 'Requisição GET Simples',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
        .result-box {
          background: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          min-height: 60px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Requisição GET</div>
        <div class="story-description">
          Exemplo básico de requisição GET com feedback de sucesso e erro.
        </div>

        <nm-button name="load">
          Buscar Dados
          <nm-icon use="cloud_download"></nm-icon>
        </nm-button>

        <div class="result-box">
          <nm-text value="Aguardando...">
            <nm-on value="api/succeeded:attribute/value|prop=title"></nm-on>
            <nm-on value="api/errored:attribute/value|always=Erro ao carregar dados"></nm-on>
            <nm-on value="load/clicked:attribute/value|always=Carregando..."></nm-on>
          </nm-text>
        </div>

        <nm-fetch name="api" url="https://jsonplaceholder.typicode.com/posts/1">
          <nm-on value="load/clicked:method/get"></nm-on>
        </nm-fetch>
      </div>
    `
    return container
  },
}

export const PostRequest = {
  name: 'Requisição POST',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Criação de Recurso (POST)</div>
        <div class="story-description">
          Demonstra requisição POST para criar um novo recurso.
        </div>

        <nm-form>
          <template>
            <nm-input name="title" required>
              <nm-label>Título</nm-label>
              <nm-validity state="valueMissing">Título é obrigatório</nm-validity>
            </nm-input>

            <nm-input name="body" required>
              <nm-label>Conteúdo</nm-label>
              <nm-validity state="valueMissing">Conteúdo é obrigatório</nm-validity>
            </nm-input>

            <nm-button width="fill">
              Criar Post
              <nm-icon use="send"></nm-icon>
            </nm-button>
          </template>
          <nm-on value="api/succeeded:method/resetted"></nm-on>
        </nm-form>

        <nm-text value="">
          <nm-on value="api/succeeded:attribute/value|always=Post criado com sucesso! ✓"></nm-on>
          <nm-on value="api/errored:attribute/value|always=Erro ao criar post ✗"></nm-on>
        </nm-text>

        <nm-fetch name="api" url="https://jsonplaceholder.typicode.com/posts">
          <nm-on value="nm-form/submitted:method/posted"></nm-on>
        </nm-fetch>
      </div>
    `
    return container
  },
}
