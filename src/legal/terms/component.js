import "@t2e1/kuba"
import { html } from "@t2e1/kuba/dom"

const component = () => {
  return html`
    <nm-header>
      <nm-button name="backPrivacy" color="secondary" variant="text" icononly>
        <nm-icon use="arrow_back" size="md"></nm-icon>
        <nm-redirect href="/auth/sign-in" on="backPrivacy/clicked:method/go"></nm-redirect>
      </nm-button>
      <kb-text size="md" weight="bold" color="secondary-darker">Termos de uso</kb-text>
    </nm-header>

    <kb-main>
      <kb-stack spacing="xs" direction="column" width="100%">
        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">1. Aceitação dos termos</kb-text>
          <kb-text color="secondary-dark">
            Ao criar uma conta ou utilizar o Namorim, você concorda com estes Termos de Uso e com a nossa
            <a href="/privacy-policy">política de privacidade</a>. Caso não concorde, não utilize o aplicativo.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">2. Elegibilidade</kb-text>
          <kb-text color="secondary-dark">
            O uso do Namorim é permitido apenas para maiores de 18 anos. Ao se cadastrar, você declara possuir
            idade mínima exigida e ser capaz de firmar um compromisso legal vinculante.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">3. Sua conta</kb-text>
          <kb-text color="secondary-dark">
            Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as
            atividades realizadas em sua conta.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">4. Conduta do usuário</kb-text>
          <kb-text color="secondary-dark">
            É proibido publicar conteúdo falso, ofensivo, discriminatório ou ilegal, assediar outros usuários ou
            utilizar o aplicativo para fins fraudulentos.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">5. Cancelamento</kb-text>
          <kb-text color="secondary-dark">
            Você pode encerrar sua conta a qualquer momento. Podemos suspender ou encerrar contas que violem
            estes termos.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">6. Alterações</kb-text>
          <kb-text color="secondary-dark">
            Estes termos podem ser atualizados periodicamente. O uso continuado do aplicativo após alterações
            implica aceitação da nova versão.
          </kb-text>
        </kb-stack>

        <footer>
          <kb-text color="secondary-dark">Voltar para <a href="/auth/sign-in">login</a></kb-text>
        </footer>
      </kb-stack>
    </kb-main>
  `
}

export default component
