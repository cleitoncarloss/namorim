import './on'

export default {
  title: 'Directives/On',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-on\` e uma diretiva headless que conecta eventos entre componentes.

## Sintaxe

\`\`\`
<nm-on value="source/event:target/action|filter"></nm-on>
\`\`\`

## Formato do Value

\`source/event:target/action|filter1|filter2|filter3\`

- **source**: Nome do componente emissor do evento
- **event**: Nome do evento a escutar
- **target**: Tipo de acao (method, attribute)
- **action**: Nome do metodo ou atributo
- **filter**: Filtros opcionais encadeados com \`|\` para transformar o valor

## Filtros Disponíveis

### Lógicos
- **always**: Retorna sempre o mesmo valor
- **truthy**: Converte para booleano (valores truthy/falsy)
- **not**: Inverte valor booleano
- **equals**: Compara se é igual a um valor
- **different**: Compara se é diferente de um valor

### Numéricos
- **add**: Adiciona um valor
- **subtract**: Subtrai um valor
- **inc**: Incrementa em 1
- **dec**: Decrementa em 1
- **gt**: Maior que (greater than)
- **gte**: Maior ou igual (greater than or equal)
- **lt**: Menor que (less than)
- **lte**: Menor ou igual (less than or equal)

### Utilitários
- **prop**: Extrai propriedade de um objeto
- **len**: Retorna o tamanho de array/string
- **index**: Acessa índice de array

## Exemplos Simples

\`\`\`html
<!-- Chama metodo push quando input emite sent -->
<nm-on value="input/sent:method/push"></nm-on>

<!-- Define atributo waiting=true quando agent emite thinking -->
<nm-on value="agent/thinking:attribute/waiting|always=true"></nm-on>

<!-- Incrementa contador ao clicar -->
<nm-on value="button/clicked:method/setCount|inc"></nm-on>

<!-- Define loading=false quando requisicao completa -->
<nm-on value="api/complete:attribute/loading|always=false"></nm-on>

<!-- Extrai propriedade 'name' do evento -->
<nm-on value="form/submitted:method/setName|prop=name"></nm-on>

<!-- Compara se valor é maior que 10 -->
<nm-on value="input/changed:attribute/valid|gt=10"></nm-on>
\`\`\`

## Exemplos com Filtros Encadeados

\`\`\`html
<!-- Extrai propriedade 'value' e incrementa -->
<nm-on value="input/changed:method/setCount|prop=value|inc"></nm-on>

<!-- Extrai 'total', adiciona 10 e verifica se é maior que 100 -->
<nm-on value="cart/update:attribute/valid|prop=total|add=10|gt=100"></nm-on>

<!-- Pega tamanho de array e verifica se é diferente de 0 -->
<nm-on value="list/changed:attribute/hasItems|len|different=0"></nm-on>

<!-- Extrai 'count', decrementa e verifica se é menor ou igual a 0 -->
<nm-on value="item/remove:attribute/empty|prop=count|dec|lte=0"></nm-on>

<!-- Pega valor, inverte booleano e converte para truthy -->
<nm-on value="toggle/clicked:method/setState|not|truthy"></nm-on>

<!-- Acessa índice 0 do array e extrai propriedade 'id' -->
<nm-on value="items/load:method/setFirstId|index=0|prop=id"></nm-on>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Expressao de binding no formato source/event:target/action',
    },
  },
}

export const ConditionalVisibility = {
  name: 'Visibilidade Condicional',
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
        <div class="story-title">Contador de Café</div>
        <div class="story-description">
          Exemplo de uso de nm-on com operadores condicionais (lte, gte, not) para controlar
          a visibilidade de elementos baseado no valor do formulário.
        </div>

        <nm-form>
          <template>
            <nm-stack direction="column">
              <nm-input name="coffee" type="number" min="0" max="10" required>
                <nm-label>Quantos cafés você já tomou hoje?</nm-label>
                <nm-validity state="valueMissing">Ei, cadê o café? Digite um valor antes de prosseguir!</nm-validity>
                <nm-validity state="rangeUnderflow">Hum… café negativo? Só aceitamos 0 ou mais!</nm-validity>
                <nm-validity state="rangeOverflow">Uau, muita cafeína! No máximo 10 cafés por dia.</nm-validity>
              </nm-input>
              <nm-button width="320px">
                Registrar café
                <nm-icon use="local_cafe"></nm-icon>
              </nm-button>
            </nm-stack>
          </template>
          <nm-on value="nm-form/submitted:attribute/hidden|always=true"></nm-on>
          <nm-on value="refresh/clicked:attribute/hidden|always=false"></nm-on>
          <nm-on value="refresh/clicked:method/resetted"></nm-on>
        </nm-form>

        <nm-stack direction="column" hidden>
          <nm-text>😌 Tá suave. Mais um não mata!</nm-text>
          <nm-button name="refresh" width="320px">
            Zerar contagem
            <nm-icon use="refresh"></nm-icon>
          </nm-button>
          <nm-on value="nm-form/submitted:attribute/hidden|prop=coffee|lte=5|not"></nm-on>
          <nm-on value="refresh/clicked:attribute/hidden|always=true"></nm-on>
        </nm-stack>

        <nm-stack direction="column" hidden>
          <nm-text>😵 Já chega, mano! Vai explodir!</nm-text>
          <nm-button name="refresh" width="320px">
            Tentar de novo
            <nm-icon use="refresh"></nm-icon>
          </nm-button>
          <nm-on value="nm-form/submitted:attribute/hidden|prop=coffee|gte=6|not"></nm-on>
          <nm-on value="refresh/clicked:attribute/hidden|always=true"></nm-on>
        </nm-stack>
      </div>
    `
    return container
  },
}

export const AttributeManipulation = {
  name: 'Manipulação de Atributos',
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
        <div class="story-title">Controle de Estado de Botão</div>
        <div class="story-description">
          Demonstra como nm-on pode usar filtros (len, equals) para habilitar/desabilitar
          um botão baseado no tamanho de um array.
        </div>

        <nm-button name="add" value='{"name":"João","age":25}'>
          Adicionar Item
          <nm-icon use="add"></nm-icon>
        </nm-button>

        <nm-button name="clear">
          Limpar Todos
          <nm-icon use="clear"></nm-icon>
        </nm-button>

        <nm-text value="0 itens">
          <nm-on value="items/changed:attribute/value|len"></nm-on>
        </nm-text>

        <nm-button name="save" variant="outlined" disabled>
          Salvar (habilitado quando houver itens)
          <nm-icon use="save"></nm-icon>
          <nm-on value="items/changed:attribute/disabled|len|equals=0"></nm-on>
        </nm-button>

        <nm-dataset name="items" upsert="id">
          <nm-on value="add/clicked:method/push"></nm-on>
          <nm-on value="clear/clicked:method/resetted"></nm-on>
        </nm-dataset>
      </div>
    `
    return container
  },
}

export const ChainedFilters = {
  name: 'Filtros Encadeados',
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
        .example-box {
          background: #f5f5f5;
          padding: 12px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 12px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Transformação de Dados com Filtros</div>
        <div class="story-description">
          Exemplo de uso de múltiplos filtros encadeados para transformar dados
          antes de aplicá-los a atributos ou métodos.
        </div>

        <nm-button value='{"coffee":5}'>Enviar 5 cafés</nm-button>
        <nm-button value='{"coffee":10}'>Enviar 10 cafés</nm-button>

        <div class="example-box">
          Valor original (coffee): <span id="original">-</span><br>
          Após inc (coffee + 1): <span id="incremented">-</span><br>
          Após gt=7 (> 7): <span id="comparison">-</span>
        </div>

        <nm-text id="original" value="-">
          <nm-on value="nm-button/clicked:attribute/value|prop=coffee"></nm-on>
        </nm-text>

        <nm-text id="incremented" value="-">
          <nm-on value="nm-button/clicked:attribute/value|prop=coffee|inc"></nm-on>
        </nm-text>

        <nm-text id="comparison" value="-">
          <nm-on value="nm-button/clicked:attribute/value|prop=coffee|inc|gt=7"></nm-on>
        </nm-text>
      </div>
    `
    return container
  },
}
