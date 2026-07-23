import "@t2e1/kuba"
import { html } from "@t2e1/kuba/dom"

const component = () => {
  return html`
    <kb-main>
      <kb-stack spacing="quarck" direction="column" width="100%">
        <kb-text weight="bold" color="secondary-dark" size="lg">Vamos começar</kb-text>
        <kb-text weight="regular" color="secondary">Informe seus dados para iniciar seu cadastro</kb-text>
      </kb-stack>

      <kb-form autorender width="100%">
        <template>
          <kb-stack spacing="sm" direction="column" width="100%">
            <kb-input name="firstName" width="100%" placeholder="Seu nome" required>
              <kb-label>Nome</kb-label>

              <kb-validity state="valueMissing">Nome é obrigatorio</kb-validity>
            </kb-input>

            <kb-input name="lastName" width="100%" placeholder="Seu sobrenome" required>
              <kb-label>Sobrenome</kb-label>

              <kb-validity state="valueMissing">Sobrenome é obrigatorio</kb-validity>
            </kb-input>

            <kb-input name="email" type="email" width="100%" placeholder="seu@email.com" required>
              <kb-label>E-mail</kb-label>

              <kb-validity state="valueMissing">E-mail é obrigatorio</kb-validity>
              <kb-validity state="typeMismatch">Digite um e-mail válido</kb-validity>
            </kb-input>

            <kb-input name="cpf" width="100%" placeholder="000.000.000-00" required>
              <kb-label>CPF</kb-label>

              <kb-validity state="valueMissing">Cpf é obrigatorio</kb-validity>
            </kb-input>

            <kb-button width="100%" disabled>Próximo</kb-button>

          </kb-stack>
        </template>
      </kb-form>
    </kb-main>
  `
}

export default component
