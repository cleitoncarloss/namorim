import "@t2e1/kuba"
import "@book/components/button"
import { html } from "@t2e1/kuba/dom"
import states from "./states"
import { days, months, years } from "./birth-date-options"

const component = () => {
  return html`
    <nm-header>
      <kb-stack direction="column" spacing="quarck" width="100%">
      <kb-text>Passo 1 de 4</kb-text>
        <kb-progress value="25"></kb-progress>
      </kb-stack>
    </nm-header>

    <kb-main>
      <kb-stack spacing="quarck" direction="column" width="100%">
        <kb-text weight="bold" color="secondary-dark" size="lg">Vamos começar</kb-text>
        <kb-text weight="regular" color="secondary">Informe seus dados para iniciar seu cadastro</kb-text>
      </kb-stack>

      <kb-form autorender width="100%">
        <template>
          <kb-stack spacing="sm" direction="column" width="100%">
            <nm-input name="name" width="100%" placeholder="Seu nome" required>
              <nm-label>Nome</nm-label>

              <nm-validity state="valueMissing">Nome é obrigatorio</nm-validity>
            </nm-input>

            <nm-input name="lastName" width="100%" placeholder="Seu sobrenome" required>
              <nm-label>Sobrenome</nm-label>

              <nm-validity state="valueMissing">Sobrenome é obrigatorio</nm-validity>
            </nm-input>

            <nm-input name="email" type="email" width="100%" placeholder="Seu email" required>
              <nm-label>E-mail</nm-label>

              <nm-validity state="valueMissing">E-mail é obrigatorio</nm-validity>
              <nm-validity state="typeMismatch">Digite um e-mail válido</nm-validity>
            </nm-input>

            <nm-select name="state" width="100%" placeholder="Selecione um estado" required>
              <nm-label>Em qual estado você mora</nm-label>
              ${states.map(
                (state) => `<option value="${state.uf}">${state.name}</option>`
              )}
              <nm-validity state="valueMissing">Estado é obrigatorio</nm-validity>
            </nm-select>

            <kb-stack direction="column" spacing="0" width="100%">
              <kb-text weight="medium">Data de nascimento</kb-text> 
              <kb-stack spacing="nano" width="100%">
                <nm-select name="day" width="100%" placeholder="Dia" required>
                  ${days.map((day) => `<option value="${day}">${day}</option>`)}
                  <nm-validity state="valueMissing">(D) é obrigatorio</nm-validity>
                </nm-select>

                <nm-select name="month" width="100%" placeholder="Mês" required>
                  ${months.map((month) => `<option value="${month.value}">${month.name}</option>`)}
                  <nm-validity state="valueMissing">(M) é obrigatorio</nm-validity>
                </nm-select>

                <nm-select name="year" width="100%" placeholder="Ano" required>
                  ${years().map((year) => `
                    <option value="${year}">${year}</option>
                  `)}
                  <nm-validity state="valueMissing">(A) é obrigatorio</nm-validity>
                </nm-select>
              </kb-stack>
            </kb-stack>

            <nm-input name="cpf" width="100%" placeholder="Seu cpf" required>
              <nm-label>CPF</nm-label>

              <nm-validity state="valueMissing">Cpf é obrigatorio</nm-validity>
            </nm-input>

            <nm-button width="100%" weight="medium">
              Próximo
            </nm-button>
          </kb-stack>
        </template>
      </kb-form>
    </kb-main>
  `
}

export default component
