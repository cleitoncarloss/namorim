import { html } from '@dom';
import logo from './logo2.svg';
import google from './google.svg';

const component = () => {
  return html`
    <main>
      <nm-container>
        <div>
          <figure>
            <img
              src="${logo}"
              alt="Namorim Logo"
            />
          </figure>
          <nav>
            <nm-button
              type="button"
              variant="tonal-outlined"
              color="tertiary"
              width="100%"
            >
              <img
                src="${google}"
                alt="Imagem do google"
              />
              Entrar com Google
            </nm-button>

            <nm-button
              type="button"
              variant="text"
              color="primary"
              width="100%"
            >
              Criar Conta
            </nm-button>
          </nav>
        </div>
      </nm-container>
    </main>
  `
}

export default component
