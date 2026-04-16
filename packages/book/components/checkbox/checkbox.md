# nm-checkbox

Componente de checkbox que segue o padrão de design do projeto, com suporte a validação de formulário e estados customizados.

## Uso Básico

```html
<nm-checkbox id="agree" name="agree">
  <span slot="label">I agree to the terms and conditions</span>
  <span slot="helper">Please read our terms before proceeding</span>
</nm-checkbox>
```

## Propriedades

| Propriedade | Tipo      | Padrão | Descrição                              |
| ----------- | --------- | ------ | -------------------------------------- |
| `id`        | `string`  | `''`   | ID do elemento checkbox                |
| `name`      | `string`  | `''`   | Nome do campo para envio de formulário |
| `checked`   | `boolean` | `false`| Estado checked do checkbox             |
| `disabled`  | `boolean` | `false`| Desabilita o componente                |
| `required`  | `boolean` | `false`| Torna o campo obrigatório              |
| `hidden`    | `boolean` | `false`| Oculta o componente                    |
| `width`     | `string`  | `auto` | Largura do componente                  |

## Slots

- `label` - Label/texto do checkbox
- `helper` - Texto de ajuda/descrição adicional

## Eventos

- `changed` - Disparado quando o estado do checkbox é alterado
  - `detail`: Novo estado (boolean)

## Validação de Formulário

O componente suporta validação nativa de formulário através da API ElementInternals:

```javascript
const checkbox = document.querySelector('nm-checkbox')

// Verificar validade
checkbox.checkValidity() // retorna boolean

// Reportar validade (mostra mensagem de erro nativa)
checkbox.reportValidity()
```

## Exemplos

### Checkbox Obrigatório

```html
<nm-checkbox id="terms" name="terms" required>
  <span slot="label">I accept the terms and conditions</span>
  <span slot="helper">Required to proceed</span>
</nm-checkbox>
```

### Checkbox Marcado

```html
<nm-checkbox id="newsletter" name="newsletter" checked>
  <span slot="label">Subscribe to newsletter</span>
</nm-checkbox>
```

### Checkbox Desabilitado

```html
<nm-checkbox id="readonly" name="readonly" disabled checked>
  <span slot="label">This option is not available</span>
</nm-checkbox>
```

### Múltiplos Checkboxes

```html
<form>
  <nm-checkbox id="option1" name="options" value="1">
    <span slot="label">Option 1</span>
  </nm-checkbox>

  <nm-checkbox id="option2" name="options" value="2">
    <span slot="label">Option 2</span>
  </nm-checkbox>

  <nm-checkbox id="option3" name="options" value="3">
    <span slot="label">Option 3</span>
  </nm-checkbox>
</form>
```

## Tratamento de Eventos

```javascript
const checkbox = document.querySelector('nm-checkbox')

checkbox.addEventListener('changed', (event) => {
  console.log('Checkbox state:', event.detail) // true ou false
})
```
