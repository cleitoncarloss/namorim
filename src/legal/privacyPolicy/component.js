import "@t2e1/kuba"
import { html } from "@t2e1/kuba/dom"

const component = () => {
  return html`
    <nm-header>
      <nm-button name="backPrivacy" color="secondary" variant="text" icononly>
        <nm-icon use="arrow_back" size="md"></nm-icon>
        <nm-redirect href="/auth/sign-in" on="backPrivacy/clicked:method/go"></nm-redirect>
      </nm-button>
      <kb-text size="md" weight="bold" color="secondary-darker">Política de Privacidade</kb-text>
    </nm-header>

    <kb-main>
      <kb-stack spacing="xs" direction="column" width="100%">
        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">1. Dados que coletamos</kb-text>
          <kb-text color="secondary-dark">
            Coletamos informações fornecidas por você no cadastro (como nome, e-mail, foto de perfil e bio) e
            informações geradas pelo uso do aplicativo, como curtidas, matches e mensagens.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">2. Como usamos seus dados</kb-text>
          <kb-text color="secondary-dark">
            Utilizamos seus dados para viabilizar o funcionamento do aplicativo, sugerir matches, melhorar a
            experiência do usuário e garantir a segurança da plataforma.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">3. Compartilhamento de dados</kb-text>
          <kb-text color="secondary-dark">
            Não vendemos seus dados pessoais. Podemos compartilhar informações com prestadores de serviço
            essenciais para a operação do Namorim, como provedores de infraestrutura e autenticação.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">4. Armazenamento e segurança</kb-text>
          <kb-text color="secondary-dark">
            Seus dados são armazenados de forma segura utilizando infraestrutura do Supabase, com controles de
            acesso e criptografia adequados.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">5. Seus direitos</kb-text>
          <kb-text color="secondary-dark">
            Você pode acessar, corrigir ou solicitar a exclusão dos seus dados a qualquer momento através das
            configurações da conta.
          </kb-text>
        </kb-stack>

        <kb-stack spacing="quarck" direction="column" width="100%">
          <kb-text size="md" weight="medium" color="secondary-darker">6. Alterações nesta política</kb-text>
          <kb-text color="secondary-dark">
            Esta política pode ser atualizada periodicamente. Recomendamos revisá-la com frequência para se
            manter informado sobre como protegemos seus dados.
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
