### `<nm-on>`

**Objetivo**
Conecta eventos entre componentes.

**Atributos**
- `value` — default `''`. Livre. Expressão de binding no formato `source/event:target/action|filter`.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
Nenhum (atua como um ouvinte e despachante de eventos).

**Use quando**
- Precisa criar interações complexas entre diferentes componentes sem acoplamento direto.
- Necessita transformar dados de eventos antes de aplicá-los a outros componentes (usando filtros).

**Não use quando**
- A interação é simples e pode ser tratada diretamente com event listeners nativos do DOM.

## Sintaxe

```
<nm-on value="source/event:target/action|filter"></nm-on>
```

## Formato do Value

`source/event:target/action|filter1|filter2|filter3`

- **source**: Nome do componente emissor do evento
- **event**: Nome do evento a escutar
- **target**: Tipo de acao (method, attribute)
- **action**: Nome do metodo ou atributo
- **filter**: Filtros opcionais encadeados com `|` para transformar o valor

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

```html
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
```

## Exemplos com Filtros Encadeados

```html
<!-- Extrai propriedade 'value' e incrementa -->
<nm-on value="input/changed:method/setCount|prop=value|inc"></nm-on>

<!-- Extrai 'total', adiciona 10 e verifica se é maior que 100 -->
<nm-on value="cart/updated:attribute/valid|prop=total|add=10|gt=100"></nm-on>

<!-- Pega tamanho de array e verifica se é diferente de 0 -->
<nm-on value="list/changed:attribute/hasItems|len|different=0"></nm-on>

<!-- Extrai 'count', decrementa e verifica se é menor ou igual a 0 -->
<nm-on value="item/remove:attribute/empty|prop=count|dec|lte=0"></nm-on>

<!-- Pega valor, inverte booleano e converte para truthy -->
<nm-on value="toggle/clicked:method/setState|not|truthy"></nm-on>

<!-- Acessa índice 0 do array e extrai propriedade 'id' -->
<nm-on value="items/load:method/setFirstId|index=0|prop=id"></nm-on>
```