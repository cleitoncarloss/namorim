import "@t2e1/kuba"
import { html } from "@t2e1/kuba/dom"
import logo from "./logo2.svg"
import google from "./google.svg"

const component = () => {
  return html`
    <kb-main>
      <kb-stack spacing="md" align="center" direction="column" width="100%">
        <figure>
          <img
            src="${logo}"
            alt="Namorim Logo"
          />
        </figure>

        <kb-button width="fill">
          <img src=${google} />
          Entrar com Google
        </kb-button>

        <footer>
          <kb-text color="secondary-dark">Ao continuar, você concorda que leu nossos <a href="/terms">termos de uso</a> e 
          <a href="/privacy-policy">política de privacidade</a></kb-text>
        </footer>
      </kb-stack>
    </kb-main>
  `
}

export default component
