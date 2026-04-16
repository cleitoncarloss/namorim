### `<nm-redirect>`

**Objetivo**
Diretiva headless para navegação programática.

**Atributos**
- `href` — default `#`. Livre. URL de destino para navegação.

**Conteúdo**
- Não aceita conteúdo interno. O que aparece é definido pelos atributos.

**Eventos**
Nenhum.

**Use quando**
- Precisa redirecionar o usuário para outra URL de forma programática, sem um clique direto em um link.

**Não use quando**
- Precisa de um link visível e clicável → use `<nm-link>`.

## Uso

```html
<nm-redirect href="/dashboard"></nm-redirect>
```

## Metodos

- **go()**: Executa a navegação para o href configurado usando `history.pushState`

## Exemplo com Event Binding

```html
<nm-button value="dashboard">Ir para Dashboard</nm-button>
<nm-redirect href="/dashboard">
  <nm-on value="button/clicked:method/go"></nm-on>
</nm-redirect>
```
