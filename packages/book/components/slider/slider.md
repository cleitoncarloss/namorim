# morph-slider

Componente de slider que segue o padrão de design do projeto, permitindo que o usuário selecione um valor numérico dentro de um intervalo definido através de uma entrada visual e intuitiva.

## Uso Básico

```html
<morph-slider id="volume" name="volume" min="0" max="100" value="50">
  <span slot="label">Volume</span>
  <span slot="helper">Ajuste o volume entre 0 e 100</span>
</morph-slider>
```

## Propriedades

| Propriedade | Tipo      | Padrão | Descrição                                   |
| ----------- | --------- | ------ | ------------------------------------------- |
| `min`       | `number`  | `0`    | Valor mínimo permitido                      |
| `max`       | `number`  | `100`  | Valor máximo permitido                      |
| `step`      | `number`  | `1`    | Incremento para cada passo                  |
| `value`     | `number`  | `0`    | Valor atual do slider                       |
| `name`      | `string`  | `''`   | Nome do campo para envio de formulário      |
| `disabled`  | `boolean` | `false`| Desabilita o componente                     |
| `hidden`    | `boolean` | `false`| Oculta o componente                         |
| `width`     | `string`  | `hug`  | Largura do componente (hug, fill, ou px/%) |

## Getters Computados

O componente fornece getters computados para acesso a valores processados:

| Getter       | Tipo     | Descrição                                                   |
| ------------ | -------- | ----------------------------------------------------------- |
| `normalized` | `number` | Valor normalizado entre 0 e 1 (0% = 0, 100% = 1)           |
| `progress`   | `number` | Porcentagem do progresso (0-100)                            |

### Exemplo de Uso

```javascript
const slider = document.querySelector('morph-slider')

// Obter valor normalizado (0-1)
console.log(slider.normalized) // Ex: 0.5 (se value=50, min=0, max=100)

// Obter porcentagem
console.log(slider.progress) // Ex: 50 (se value=50, min=0, max=100)

// Obter valor numérico
console.log(slider.value) // Ex: 50
```

## Slots

- `label` - Label/texto descritivo do slider
- `helper` - Texto de ajuda ou descrição adicional

## Eventos

- `change` - Disparado quando o valor do slider é alterado pelo usuário
  - `detail`: Novo valor como string (ex: "50")

## Validação de Formulário

O componente suporta integração com formulários nativos através da API ElementInternals:

```javascript
const slider = document.querySelector('morph-slider')

// Obter o valor do slider
console.log(slider.value) // "50"

// Verificar se é válido
slider.checkValidity() // retorna boolean

// Reportar validade (mostra validação nativa)
slider.reportValidity()
```

## Exemplos

### Slider Simples

```html
<morph-slider id="brightness" name="brightness" min="0" max="100" value="75">
  <span slot="label">Brilho</span>
</morph-slider>
```

### Slider com Range Customizado

```html
<morph-slider id="price" name="price" min="10" max="1000" step="10" value="500">
  <span slot="label">Preço Máximo</span>
  <span slot="helper">Selecione um valor entre R$ 10 e R$ 1.000</span>
</morph-slider>
```

### Slider Desabilitado

```html
<morph-slider id="readonly" name="readonly" value="50" disabled>
  <span slot="label">Opção Indisponível</span>
  <span slot="helper">Este controle não está disponível</span>
</morph-slider>
```

### Slider em Formulário

```html
<form>
  <morph-slider id="opacity" name="opacity" min="0" max="100" step="5" value="100">
    <span slot="label">Opacidade</span>
  </morph-slider>

  <morph-slider id="speed" name="speed" min="0.5" max="2" step="0.1" value="1">
    <span slot="label">Velocidade</span>
  </morph-slider>

  <morph-button type="submit">Salvar Preferências</morph-button>
</form>
```

### Slider com Largura Customizada

```html
<morph-slider id="custom" name="custom" value="50" width="300px">
  <span slot="label">Slider Customizado</span>
</morph-slider>
```

## Tratamento de Eventos

```javascript
const slider = document.querySelector('morph-slider')

// Escutar mudanças do slider
slider.addEventListener('change', (event) => {
  console.log('Novo valor:', event.detail) // "50"
  console.log('Valor numérico:', Number(event.detail)) // 50
})

// Programaticamente alterar valor
slider.value = '75'

// Acessar valor atual
console.log(slider.value) // "75"
console.log(slider.min)   // "0"
console.log(slider.max)   // "100"
console.log(slider.step)  // "1"

// Acessar valores normalizados
console.log(slider.normalized) // 0.75 (para value=75, min=0, max=100)
console.log(slider.progress)   // 75 (porcentagem)
```

## Padrões de Uso

### Slider com Feedback Visual

```javascript
const slider = document.querySelector('morph-slider')
const valueDisplay = document.querySelector('#value-display')

slider.addEventListener('change', (event) => {
  valueDisplay.textContent = `${event.detail}%`
})

// Inicializar display
valueDisplay.textContent = `${slider.value}%`
```

### Múltiplos Sliders Sincronizados

```html
<form>
  <morph-slider id="red" name="red" min="0" max="255" value="128">
    <span slot="label">Vermelho</span>
  </morph-slider>

  <morph-slider id="green" name="green" min="0" max="255" value="128">
    <span slot="label">Verde</span>
  </morph-slider>

  <morph-slider id="blue" name="blue" min="0" max="255" value="128">
    <span slot="label">Azul</span>
  </morph-slider>

  <div id="color-preview" style="width: 100px; height: 100px;"></div>
</form>
```

```javascript
const sliders = document.querySelectorAll('morph-slider')
const preview = document.querySelector('#color-preview')

function updateColor() {
  const red = document.querySelector('#red').value
  const green = document.querySelector('#green').value
  const blue = document.querySelector('#blue').value
  preview.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

sliders.forEach(slider => {
  slider.addEventListener('change', updateColor)
})

updateColor() // Inicializar
```

## Casos de Uso Avançados

### Como Controle de Número (Volume, Brilho, etc.)

```javascript
const slider = document.querySelector('#volume')

slider.addEventListener('change', (event) => {
  const volume = Number(event.detail) // 0-100
  console.log(`Volume definido para: ${volume}%`)
  applyVolume(volume)
})
```

### Como Indicador de Progresso

```javascript
const progressSlider = document.querySelector('#progress')

// Simular progresso de 0 a 100
let progress = 0
const interval = setInterval(() => {
  progress += 10
  progressSlider.value = progress

  if (progress >= 100) {
    clearInterval(interval)
  }
}, 500)

// Acessar progresso normalizado (0-1) para animações
slider.addEventListener('change', (event) => {
  const normalized = slider.normalized // 0 a 1
  updateAnimationProgress(normalized)
})
```

### Mapeamento de Valores Customizado

```javascript
const slider = document.querySelector('#price')

slider.addEventListener('change', (event) => {
  // Mapear intervalo 0-100 para preço $0-$1000
  const percentage = slider.normalized // 0-1
  const price = percentage * 1000
  console.log(`Preço selecionado: $${price}`)
})
```

## Observações

- O valor é armazenado internamente como `number`, mas interfaces externas trabalham com strings quando necessário
- O componente é form-associated e participa automaticamente de formulários HTML
- A trilha do slider mostra visualmente o progresso: lado colorido (preenchido) e lado cinza (não preenchido)
- O componente suporta temas claro e escuro através de design tokens CSS
- Os getters `normalized` e `progress` são calculados dinamicamente com base em `min`, `max` e `value` atuais
