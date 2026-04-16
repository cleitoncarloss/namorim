import { html } from '@dom';
import logo from './logo2.svg';
import google from './google.svg';

const component = () => {
  return html`
    <main>
      <nm-container>
        <nm-stack align="center" gap="64px" direction="column" justify="center" width="100%">
          <figure>
            <img
              src="${logo}"
              alt="Namorim Logo"
            />
          </figure>
          <nm-button
            type="button"
            variant="primary"
            color="primary"
            width="100%"
            weight="bold"
          >
            <img
              src="${google}"
              alt="Imagem do google"
            />
            Entrar com Google
          </nm-button>

          <footer>
            <nm-text align="center" color="secondary-light">Ao continuar, você concorda que leu nossos 
              <nm-link href="/terms">termos de uso</nm-link> e <nm-link href="/privacy-police">política de privacidade</nm-link
            </nm-text>
          </footer>
        </nm-stack>
      </nm-container>
    </main>
  `
}

export default component
