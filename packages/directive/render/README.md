# `render`

Decorator de classe que conecta um Custom Element a uma função de renderização
definida em um arquivo `.js` separado, eliminando a necessidade de implementar
`connectedCallback` diretamente no arquivo `.ts` do componente.

## Motivação

Cada componente é dividido em dois arquivos:

- **`*.ts`** — define a classe do Custom Element e seus decorators
  (`@define`, `@render`, etc). Responsável pela estrutura (constructor,
  shadow root) e composição.
- **`*.js`** (renderização) — define a função de renderização (template/markup),
  tipicamente usando [`@dom/html`](../../dom/html/README.md), que retorna o
  markup a ser inserido no shadow root.
- **`style.js`** (opcional) — define uma ou mais funções de estilo, usando
  `@dom/css`, que retornam um `CSSStyleSheet` a ser adotado pelo shadow root.

O decorator `render` é o elo entre os três: ele injeta a chamada da função de
renderização e das funções de estilo no ciclo de vida do elemento, sem que o
`.ts` precise conhecer os detalhes de como o template ou os estilos são
montados.

## Contrato

```ts
type RenderFn = (this: HTMLElement) => string
type StyleFn = (this: HTMLElement) => CSSStyleSheet

function render(
  renderFn: RenderFn,
  ...styles: StyleFn[]
): (target: CustomElementConstructor) => CustomElementConstructor
```

- Recebe uma `renderFn` (a função de renderização importada do `.js`) que **não
  recebe argumentos** e **retorna uma string** de markup (tipicamente montada
  com [`html`](../../dom/html/README.md)).
- Recebe, opcionalmente, uma ou mais `styles` (funções importadas de
  `style.js`) que **não recebem argumentos** e **retornam um `CSSStyleSheet`**
  (tipicamente montado com `@dom/css`).
- Retorna o decorator de classe propriamente dito, que recebe o `target`
  (a classe do Custom Element) e devolve o mesmo `target`, com o
  `connectedCallback` do `prototype` sobrescrito.

## Implementação

```js
const render = (renderFn, ...styles) => (target) => {
  const { connectedCallback } = target.prototype

  target.prototype.connectedCallback = function (...args) {
    connectedCallback?.apply(this, args)

    this.shadowRoot.innerHTML = renderFn.call(this)
    this.shadowRoot.adoptedStyleSheets = styles.map((style) => style.call(this))
  }

  return target
}

export default render
```

Passo a passo:

1. **Guarda a referência do `connectedCallback` original** (`target.prototype.connectedCallback`), caso a classe já tenha um definido. Isso evita que o decorator sobrescreva/apague um `connectedCallback` escrito manualmente na classe.
2. **Substitui `connectedCallback` no `prototype`** por uma nova função que:
   - Chama o `connectedCallback` original primeiro (`connectedCallback?.apply(this, args)`), preservando qualquer lógica de ciclo de vida já existente. O `?.` protege o caso em que não havia `connectedCallback` original (`undefined`).
   - Em seguida chama `renderFn.call(this)`, executando a função de renderização com `this` apontando para a instância do elemento, e atribui a string retornada a `this.shadowRoot.innerHTML`. A função de renderização não precisa saber nada sobre `shadowRoot` — só retorna o markup.
   - Por fim, mapeia cada `style` recebido chamando `style.call(this)` (cada uma retorna um `CSSStyleSheet`) e atribui o array resultante a `this.shadowRoot.adoptedStyleSheets`. Se nenhum estilo for passado, `styles` é `[]` e `adoptedStyleSheets` recebe um array vazio.
3. **Retorna o `target`** (a própria classe), já que decorators de classe devem devolver a classe (original ou uma nova) para a cadeia de decorators continuar funcionando.

## Pré-requisito: `shadowRoot` já deve existir

O decorator **não cria** o shadow root — ele só atribui o resultado de
`renderFn` a `this.shadowRoot.innerHTML`. Por convenção do projeto, todo
`.ts` de componente deve ter um `constructor` que chama
`this.attachShadow({ mode: "open" })`:

```ts
constructor() {
  super();
  this.attachShadow({ mode: "open" });
}
```

Isso garante que, quando `connectedCallback` for disparado pelo browser
(sempre depois do `constructor`), `this.shadowRoot` já esteja disponível.

## Uso

**`component.js`** (template):

```js
import html from "@dom/html";

function component() {
  return html`
    <h1>Entrar</h1>
  `;
}

export default component;
```

**`style.js`** (estilos, opcional):

```js
import css from "@dom/css";

function style() {
  return css`
    h1 {
      font-size: 1.5rem;
    }
  `;
}

export default style;
```

**`auth.ts`** (estrutura + composição de decorators):

```ts
import define from "@directive/define";
import render from "@directive/render";
import component from "./component";
import style from "./signIn/style";

@define("nm-sign-in")
@render(component, style)
class SignIn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

export default SignIn;
```

## Ordem dos decorators

Decorators de classe são aplicados de baixo para cima (o mais próximo da
classe roda primeiro). Por isso `@render` fica abaixo de `@define`:

```ts
@define("nm-sign-in")  // 2º: registra o elemento já com o connectedCallback decorado
@render(component)     // 1º: sobrescreve o connectedCallback no prototype
class SignIn extends HTMLElement { ... }
```

Se a ordem fosse invertida, o `customElements.define` registraria a classe
antes do `connectedCallback` ser decorado, e o browser poderia (em cenários
de upgrade de elementos já presentes no DOM) disparar o `connectedCallback`
original, sem a chamada a `renderFn`.

## O que o decorator NÃO faz

- Não cria o shadow root (responsabilidade do `constructor`).
- Não gerencia re-renderizações (`disconnectedCallback`, `attributeChangedCallback`,
  etc.) — ele só participa da renderização inicial, na primeira vez que o
  elemento é conectado ao DOM (e novamente a cada nova conexão, já que
  `connectedCallback` pode ser chamado mais de uma vez caso o elemento seja
  removido e reinserido no DOM).
- Não faz merge/diff de DOM — o markup retornado por `renderFn` é aplicado
  via `innerHTML`, substituindo todo o conteúdo do `shadowRoot` a cada
  chamada.
- Não faz merge de estilos — a cada `connectedCallback`, `adoptedStyleSheets`
  é reatribuído por completo com o resultado atual de `styles`.

## Relacionado

- [`@dom/html`](../../dom/html/README.md) — tagged template usado para
  montar a string de markup que `renderFn` retorna.
- `@dom/css` — tagged template usado para montar o `CSSStyleSheet` que cada
  função de `styles` retorna.
