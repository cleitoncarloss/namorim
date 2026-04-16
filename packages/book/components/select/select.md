# nm-select

Componente de seleção (select) que segue o padrão de design do projeto, com suporte a validação de formulário e estados customizados.

## Uso Básico

```html
<nm-select id="country" name="country">
  <span slot="label">Select your country</span>
  <option value="br">Brazil</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <span slot="helper">Choose your country from the list</span>
</nm-select>
```

## Propriedades

| Propriedade | Tipo      | Padrão | Descrição                              |
| ----------- | --------- | ------ | -------------------------------------- |
| `id`        | `string`  | `''`   | ID do elemento select                  |
| `name`      | `string`  | `''`   | Nome do campo para envio de formulário |
| `value`     | `string`  | `''`   | Valor selecionado                      |
| `disabled`  | `boolean` | `false`| Desabilita o componente                |
| `required`  | `boolean` | `false`| Torna o campo obrigatório              |
| `hidden`    | `boolean` | `false`| Oculta o componente                    |
| `width`     | `string`  | `auto` | Largura do componente                  |

## Slots

- `label` - Label do campo de seleção
- `default` - Options do select
- `helper` - Texto de ajuda/descrição do campo

## Eventos

- `changed` - Disparado quando o valor é alterado
  - `detail`: Novo valor selecionado

## Validação de Formulário

O componente suporta validação nativa de formulário através da API ElementInternals:

```javascript
const select = document.querySelector('nm-select')

// Verificar validade
select.checkValidity() // retorna boolean

// Reportar validade (mostra mensagem de erro nativa)
select.reportValidity()
```

## Exemplos

### Select Obrigatório

```html
<nm-select id="role" name="role" required>
  <span slot="label">Select your role</span>
  <option value="developer">Developer</option>
  <option value="designer">Designer</option>
  <option value="manager">Manager</option>
  <span slot="helper">This field is required</span>
</nm-select>
```

### Select com Valor Pré-selecionado

```html
<nm-select id="theme" name="theme" value="dark">
  <span slot="label">Theme</span>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="auto">Auto</option>
</nm-select>
```

### Select Desabilitado

```html
<nm-select id="status" name="status" disabled value="pending">
  <span slot="label">Status</span>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="rejected">Rejected</option>
</nm-select>
```
