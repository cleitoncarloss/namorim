import './on'

export default {
  title: 'Directives/On',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`morph-on\` e uma diretiva headless que conecta eventos entre componentes.

## Sintaxe

\`\`\`
<morph-on value="source/event:target/action|filter"></morph-on>
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
<morph-on value="input/sent:method/push"></morph-on>

<!-- Define atributo waiting=true quando agent emite thinking -->
<morph-on value="agent/thinking:attribute/waiting|always=true"></morph-on>

<!-- Incrementa contador ao clicar -->
<morph-on value="button/clicked:method/setCount|inc"></morph-on>

<!-- Define loading=false quando requisicao completa -->
<morph-on value="api/complete:attribute/loading|always=false"></morph-on>

<!-- Extrai propriedade 'name' do evento -->
<morph-on value="form/submitted:method/setName|prop=name"></morph-on>

<!-- Compara se valor é maior que 10 -->
<morph-on value="input/changed:attribute/valid|gt=10"></morph-on>
\`\`\`

## Exemplos com Filtros Encadeados

\`\`\`html
<!-- Extrai propriedade 'value' e incrementa -->
<morph-on value="input/changed:method/setCount|prop=value|inc"></morph-on>

<!-- Extrai 'total', adiciona 10 e verifica se é maior que 100 -->
<morph-on value="cart/update:attribute/valid|prop=total|add=10|gt=100"></morph-on>

<!-- Pega tamanho de array e verifica se é diferente de 0 -->
<morph-on value="list/changed:attribute/hasItems|len|different=0"></morph-on>

<!-- Extrai 'count', decrementa e verifica se é menor ou igual a 0 -->
<morph-on value="item/remove:attribute/empty|prop=count|dec|lte=0"></morph-on>

<!-- Pega valor, inverte booleano e converte para truthy -->
<morph-on value="toggle/clicked:method/setState|not|truthy"></morph-on>

<!-- Acessa índice 0 do array e extrai propriedade 'id' -->
<morph-on value="items/load:method/setFirstId|index=0|prop=id"></morph-on>
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
          Exemplo de uso de morph-on com operadores condicionais (lte, gte, not) para controlar
          a visibilidade de elementos baseado no valor do formulário.
        </div>

        <morph-form>
          <template>
            <morph-stack direction="column">
              <morph-input name="coffee" type="number" min="0" max="10" required>
                <morph-label>Quantos cafés você já tomou hoje?</morph-label>
                <morph-validity state="valueMissing">Ei, cadê o café? Digite um valor antes de prosseguir!</morph-validity>
                <morph-validity state="rangeUnderflow">Hum… café negativo? Só aceitamos 0 ou mais!</morph-validity>
                <morph-validity state="rangeOverflow">Uau, muita cafeína! No máximo 10 cafés por dia.</morph-validity>
              </morph-input>
              <morph-button width="320px">
                Registrar café
                <morph-icon use="local_cafe"></morph-icon>
              </morph-button>
            </morph-stack>
          </template>
          <morph-on value="morph-form/submitted:attribute/hidden|always=true"></morph-on>
          <morph-on value="refresh/clicked:attribute/hidden|always=false"></morph-on>
          <morph-on value="refresh/clicked:method/resetted"></morph-on>
        </morph-form>

        <morph-stack direction="column" hidden>
          <morph-text>😌 Tá suave. Mais um não mata!</morph-text>
          <morph-button name="refresh" width="320px">
            Zerar contagem
            <morph-icon use="refresh"></morph-icon>
          </morph-button>
          <morph-on value="morph-form/submitted:attribute/hidden|prop=coffee|lte=5|not"></morph-on>
          <morph-on value="refresh/clicked:attribute/hidden|always=true"></morph-on>
        </morph-stack>

        <morph-stack direction="column" hidden>
          <morph-text>😵 Já chega, mano! Vai explodir!</morph-text>
          <morph-button name="refresh" width="320px">
            Tentar de novo
            <morph-icon use="refresh"></morph-icon>
          </morph-button>
          <morph-on value="morph-form/submitted:attribute/hidden|prop=coffee|gte=6|not"></morph-on>
          <morph-on value="refresh/clicked:attribute/hidden|always=true"></morph-on>
        </morph-stack>
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
          Demonstra como morph-on pode usar filtros (len, equals) para habilitar/desabilitar
          um botão baseado no tamanho de um array.
        </div>

        <morph-button name="add" value='{"name":"João","age":25}'>
          Adicionar Item
          <morph-icon use="add"></morph-icon>
        </morph-button>

        <morph-button name="clear">
          Limpar Todos
          <morph-icon use="clear"></morph-icon>
        </morph-button>

        <morph-text value="0 itens">
          <morph-on value="items/changed:attribute/value|len"></morph-on>
        </morph-text>

        <morph-button name="save" variant="outlined" disabled>
          Salvar (habilitado quando houver itens)
          <morph-icon use="save"></morph-icon>
          <morph-on value="items/changed:attribute/disabled|len|equals=0"></morph-on>
        </morph-button>

        <morph-dataset name="items" upsert="id">
          <morph-on value="add/clicked:method/push"></morph-on>
          <morph-on value="clear/clicked:method/resetted"></morph-on>
        </morph-dataset>
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

        <morph-button value='{"coffee":5}'>Enviar 5 cafés</morph-button>
        <morph-button value='{"coffee":10}'>Enviar 10 cafés</morph-button>

        <div class="example-box">
          Valor original (coffee): <span id="original">-</span><br>
          Após inc (coffee + 1): <span id="incremented">-</span><br>
          Após gt=7 (> 7): <span id="comparison">-</span>
        </div>

        <morph-text id="original" value="-">
          <morph-on value="morph-button/clicked:attribute/value|prop=coffee"></morph-on>
        </morph-text>

        <morph-text id="incremented" value="-">
          <morph-on value="morph-button/clicked:attribute/value|prop=coffee|inc"></morph-on>
        </morph-text>

        <morph-text id="comparison" value="-">
          <morph-on value="morph-button/clicked:attribute/value|prop=coffee|inc|gt=7"></morph-on>
        </morph-text>
      </div>
    `
    return container
  },
}
