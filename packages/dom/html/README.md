# `html`

Tagged template literal que monta uma string de markup a partir de um
template, interpolando valores (inclusive arrays) como texto simples.

## Contrato

```ts
function html(strings: TemplateStringsArray, ...values: unknown[]): string
```

- Recebe as partes literais do template (`strings`) e os valores
  interpolados (`values`), no formato padrão de uma tagged template
  function do JavaScript.
- Retorna uma **string** com o markup final, pronta para ser atribuída a
  `innerHTML`.

## Implementação

```js
const html = (strings, ...values) => {
  return String.raw(
    { raw: strings },
    ...values.map((value) => [].concat(value).join('')),
  )
}

export default html
```

Passo a passo:

1. **`String.raw({ raw: strings }, ...)`** reconstrói o template a partir
   das partes literais (`strings`) e dos valores interpolados, sem
   processar sequências de escape (`\n`, `\t`, etc. são mantidas como
   texto cru). Isso é importante para markup HTML, onde não queremos que
   o motor de template interprete caracteres de escape.
2. **`values.map((value) => [].concat(value).join(''))`** normaliza cada
   valor interpolado antes de inserir no template:
   - Se o valor for um **array** (por exemplo, o resultado de um `.map()`
     renderizando uma lista de itens), `[].concat(value)` o achata em um
     array plano e `.join('')` concatena os itens em uma única string.
   - Se o valor for uma **string simples** (ou qualquer valor não-array),
     `[].concat(value)` o transforma em um array de um elemento
     (`[value]`), e `.join('')` devolve o próprio valor como string.

   Isso permite interpolar tanto valores únicos quanto listas de
   sub-templates diretamente na template string, sem precisar chamar
   `.join('')` manualmente no código que usa `html`.

## Uso

```js
import html from "@dom/html";

function component() {
  return html`
    <h1>Entrar</h1>
  `;
}

export default component;
```

Interpolando uma lista:

```js
import html from "@dom/html";

function component({ items }) {
  return html`
    <ul>
      ${items.map((item) => html`<li>${item.label}</li>`)}
    </ul>
  `;
}

export default component;
```

Aqui, `items.map(...)` retorna um **array** de strings (uma por `<li>`), e o
`html` interno as concatena automaticamente antes de inserir no template
externo.

## O que o `html` NÃO faz

- **Não faz sanitização/escaping** de valores interpolados — os valores são
  inseridos como texto cru no markup. Não use `html` para interpolar dados
  não confiáveis (input de usuário) sem sanitizar antes, sob risco de XSS.
- **Não faz diff/patch de DOM** — cada chamada gera uma string nova do
  zero. Quem consome o retorno (por exemplo, o decorator
  [`render`](../../directive/render/README.md)) é responsável por decidir
  como aplicar essa string ao DOM (tipicamente via `innerHTML`).
- **Não é um parser de HTML** — não valida a estrutura do markup gerado,
  apenas monta a string.

## Relacionado

- [`@directive/render`](../../directive/render/README.md) — decorator que
  chama uma função de renderização (que normalmente usa `html`) e injeta o
  resultado no `shadowRoot` do Custom Element.
