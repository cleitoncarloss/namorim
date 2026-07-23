import "@t2e1/kuba"
import { html } from "@t2e1/kuba/dom"
import "@book/components/button"
import "@book/components/input"
import "@book/typography/label"
import "@book/typography/validity"

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
            <nm-input name="firstName" width="100%" placeholder="Seu nome" required>
              <nm-label>Nome</nm-label>

              <nm-validity state="valueMissing">Nome é obrigatorio</nm-validity>
            </nm-input>

            <nm-input name="lastName" width="100%" placeholder="Seu sobrenome" required>
              <nm-label>Sobrenome</nm-label>

              <nm-validity state="valueMissing">Sobrenome é obrigatorio</nm-validity>
            </nm-input>

            <nm-input name="email" type="email" width="100%" placeholder="seu@email.com" required>
              <nm-label>E-mail</nm-label>

              <nm-validity state="valueMissing">E-mail é obrigatorio</nm-validity>
              <nm-validity state="typeMismatch">Digite um e-mail válido</nm-validity>
            </nm-input>

            <nm-input name="cpf" width="100%" placeholder="000.000.000-00" required>
              <nm-label>CPF</nm-label>

              <nm-validity state="valueMissing">Cpf é obrigatorio</nm-validity>
            </nm-input>

            <nm-button width="100%" weight="medium">Próximo</nm-button>

          </kb-stack>
        </template>
      </kb-form>
    </kb-main>
  `
}

export default component
