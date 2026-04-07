# morph-checkbox

Componente de checkbox que segue o padrão de design do projeto, com suporte a validação de formulário e estados customizados.

## Uso Básico

```html
<morph-checkbox id="agree" name="agree">
  <span slot="label">I agree to the terms and conditions</span>
  <span slot="helper">Please read our terms before proceeding</span>
</morph-checkbox>
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
const checkbox = document.querySelector('morph-checkbox')

// Verificar validade
checkbox.checkValidity() // retorna boolean

// Reportar validade (mostra mensagem de erro nativa)
checkbox.reportValidity()
```

## Exemplos

### Checkbox Obrigatório

```html
<morph-checkbox id="terms" name="terms" required>
  <span slot="label">I accept the terms and conditions</span>
  <span slot="helper">Required to proceed</span>
</morph-checkbox>
```

### Checkbox Marcado

```html
<morph-checkbox id="newsletter" name="newsletter" checked>
  <span slot="label">Subscribe to newsletter</span>
</morph-checkbox>
```

### Checkbox Desabilitado

```html
<morph-checkbox id="readonly" name="readonly" disabled checked>
  <span slot="label">This option is not available</span>
</morph-checkbox>
```

### Múltiplos Checkboxes

```html
<form>
  <morph-checkbox id="option1" name="options" value="1">
    <span slot="label">Option 1</span>
  </morph-checkbox>

  <morph-checkbox id="option2" name="options" value="2">
    <span slot="label">Option 2</span>
  </morph-checkbox>

  <morph-checkbox id="option3" name="options" value="3">
    <span slot="label">Option 3</span>
  </morph-checkbox>
</form>
```

## Tratamento de Eventos

```javascript
const checkbox = document.querySelector('morph-checkbox')

checkbox.addEventListener('changed', (event) => {
  console.log('Checkbox state:', event.detail) // true ou false
})
```
