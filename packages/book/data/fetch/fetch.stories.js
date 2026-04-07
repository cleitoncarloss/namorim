import './fetch.ts'

export default {
  title: 'Data/Fetch',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`morph-fetch\` é uma diretiva headless que facilita requisições HTTP através do barramento de eventos.

## Características

- **Headless**: Não possui renderização visual
- **Métodos HTTP**: Suporta GET, POST, PUT, DELETE
- **Eventos**: Dispara \`succeeded\` e \`errored\` após requisições
- **Cancelamento**: Aborta requisições pendentes automaticamente
- **Interpolação**: Permite substituir variáveis na URL
- **Dataflow**: Integração via barramento de eventos com \`morph-on\`

## Sintaxe

\`\`\`html
<morph-fetch url="/api/users/:id"></morph-fetch>
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

O componente é projetado para ser usado através do barramento de eventos com \`morph-on\`.

**IMPORTANTE**: O \`morph-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Trigger de Requisição

\`\`\`html
<!-- Botão que dispara o método get do fetch -->
<morph-button>Carregar Dados</morph-button>

<!-- morph-on é filho do fetch (manipula o pai) -->
<morph-fetch url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
\`\`\`

### Passando Payload

\`\`\`html
<!-- Botão com value que será passado como payload -->
<morph-button value='{"id":123}'>Buscar Usuário 123</morph-button>

<morph-fetch url="https://api.example.com/users/:id">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
\`\`\`

### Reagindo ao Sucesso

\`\`\`html
<morph-fetch url="https://api.example.com/users"></morph-fetch>

<!-- morph-on é filho do morph-text (manipula o pai) -->
<morph-text value="">
  <morph-on value="morph-fetch/succeeded:attribute/value|prop=name"></morph-on>
</morph-text>
\`\`\`

### Reagindo ao Erro

\`\`\`html
<morph-fetch url="https://api.example.com/invalid"></morph-fetch>

<morph-text value="">
  <morph-on value="morph-fetch/errored:attribute/value|always=Erro na requisição"></morph-on>
</morph-text>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo de Leitura (GET)

\`\`\`html
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
\`\`\`

### Fluxo de Criação (POST)

\`\`\`html
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
\`\`\`

### Fluxo com Interpolação de URL

\`\`\`html
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
\`\`\`

### Fluxo de Deleção (DELETE)

\`\`\`html
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
\`\`\`

## Cancelamento Automático

Requisições pendentes são automaticamente canceladas quando uma nova requisição é iniciada:

\`\`\`html
<morph-button value='{"id":1}'>Usuário 1</morph-button>
<morph-button value='{"id":2}'>Usuário 2</morph-button>

<morph-fetch url="https://api.example.com/users/:id">
  <!-- Se clicar rápido nos dois botões, apenas a última requisição será completada -->
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>
\`\`\`

## Transformando Dados com Filtros

Use filtros do \`morph-on\` para transformar os dados recebidos:

\`\`\`html
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
          de morph-fetch com tratamento de sucesso e erro.
        </div>

        <morph-form>
          <template>
            <morph-input name="cep" required>
              <morph-label>CEP</morph-label>
              <morph-validity state="valueMissing">CEP é obrigatório</morph-validity>
            </morph-input>

            <morph-input name="estado" readonly>
              <morph-label>Estado</morph-label>
              <morph-on value="api/succeeded:attribute/value|prop=estado"></morph-on>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-input name="cidade" readonly>
              <morph-label>Cidade</morph-label>
              <morph-on value="api/succeeded:attribute/value|prop=localidade"></morph-on>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-input name="bairro" readonly>
              <morph-label>Bairro</morph-label>
              <morph-on value="api/succeeded:attribute/value|prop=bairro"></morph-on>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-input name="rua" readonly>
              <morph-label>Rua</morph-label>
              <morph-on value="api/succeeded:attribute/value|prop=logradouro"></morph-on>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-input name="numero" required>
              <morph-label>Número</morph-label>
              <morph-validity state="valueMissing">Número é obrigatório</morph-validity>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-input name="complemento">
              <morph-label>Complemento</morph-label>
              <morph-on value="api/errored:method/resetted"></morph-on>
            </morph-input>

            <morph-button width="fill">Enviar</morph-button>
            <morph-button variant="outlined" type="resetted" width="fill">Limpar</morph-button>
          </template>
        </morph-form>

        <morph-fetch name="api" url="https://viacep.com.br/ws/{}/json">
          <morph-on value="cep/changed:method/get"></morph-on>
        </morph-fetch>
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

        <morph-button name="load">
          Buscar Dados
          <morph-icon use="cloud_download"></morph-icon>
        </morph-button>

        <div class="result-box">
          <morph-text value="Aguardando...">
            <morph-on value="api/succeeded:attribute/value|prop=title"></morph-on>
            <morph-on value="api/errored:attribute/value|always=Erro ao carregar dados"></morph-on>
            <morph-on value="load/clicked:attribute/value|always=Carregando..."></morph-on>
          </morph-text>
        </div>

        <morph-fetch name="api" url="https://jsonplaceholder.typicode.com/posts/1">
          <morph-on value="load/clicked:method/get"></morph-on>
        </morph-fetch>
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

        <morph-form>
          <template>
            <morph-input name="title" required>
              <morph-label>Título</morph-label>
              <morph-validity state="valueMissing">Título é obrigatório</morph-validity>
            </morph-input>

            <morph-input name="body" required>
              <morph-label>Conteúdo</morph-label>
              <morph-validity state="valueMissing">Conteúdo é obrigatório</morph-validity>
            </morph-input>

            <morph-button width="fill">
              Criar Post
              <morph-icon use="send"></morph-icon>
            </morph-button>
          </template>
          <morph-on value="api/succeeded:method/resetted"></morph-on>
        </morph-form>

        <morph-text value="">
          <morph-on value="api/succeeded:attribute/value|always=Post criado com sucesso! ✓"></morph-on>
          <morph-on value="api/errored:attribute/value|always=Erro ao criar post ✗"></morph-on>
        </morph-text>

        <morph-fetch name="api" url="https://jsonplaceholder.typicode.com/posts">
          <morph-on value="morph-form/submitted:method/posted"></morph-on>
        </morph-fetch>
      </div>
    `
    return container
  },
}
