### `<nm-form>`

**Objetivo**
Gerencia e submete formulários, agregando os dados dos campos internos.

**Atributos**
- `hidden` — sem default. Livre. O que controla na prática se o formulário está oculto.
- `on` — sem default. Livre. O que controla na prática o binding de eventos no formato source/event:target/action (mixin Echo).

**Conteúdo**
- Aceita conteúdo interno — descreva o que pode ir (elementos de formulário como `input`, `textarea`, `<nm-button>`, etc.). O conteúdo deve ser aninhado dentro de uma tag `<template>`.

**Eventos**
- `submitted` — Disparado ao submeter o formulário (detail contém os dados do formulário).
- `resetted` — Disparado ao resetar o formulário.

**Use quando**
- Precisa agrupar campos de entrada de dados e gerenciar sua submissão ou resetted.

**Não use quando**
- Precisa apenas exibir um campo de entrada sem funcionalidade de formulário → use `<nm-input>` ou um `input` HTML simples.
