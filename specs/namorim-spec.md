# Especificação do Projeto: Namorim

## 1. Visão Geral

**Namorim** é um aplicativo de namoro projetado para conectar pessoas com base em seus interesses e preferências. O objetivo é criar uma plataforma intuitiva e segura onde os usuários possam descobrir novas pessoas, interagir e formar conexões significativas. A referência inicial para o design e funcionalidades é o aplicativo Tinder.

## 2. Objetivos do Projeto

*   Desenvolver um sistema de "match" bidirecional, onde duas pessoas precisam demonstrar interesse mútuo para iniciar uma conversa.
*   Permitir que os usuários visualizem perfis de outras pessoas e indiquem se gostaram ("like") ou não ("dislike").
*   Oferecer uma funcionalidade premium onde os usuários podem ver quem curtiu seu perfil.
*   Garantir a privacidade e segurança dos usuários.

## 3. Funcionalidades Principais

### 3.1. Gerenciamento de Perfil

*   **Criação de Conta:** Usuários poderão se cadastrar usando email, número de telefone ou redes sociais (a definir).
*   **Edição de Perfil:**
    *   Adicionar/Remover fotos.
    *   Escrever uma biografia curta.
    *   Informar dados básicos: idade, gênero, localização.
    *   Selecionar interesses e hobbies a partir de uma lista pré-definida ou tags.

### 3.2. Sistema de Descoberta (Discovery)

*   **Fila de Perfis:** A tela principal exibirá perfis de outros usuários, um de cada vez, em um formato de "cards".
*   **Ações:** Para cada perfil, o usuário poderá:
    *   **Deslizar para a direita (ou tocar em um ícone de coração):** Para indicar que gostou (Like).
    *   **Deslizar para a esquerda (ou tocar em um ícone de "X"):** Para indicar que não tem interesse (Dislike).
*   **Algoritmo de Recomendação (Versão Inicial):** Os perfis serão exibidos com base em:
    *   Preferências de gênero e idade definidas pelo usuário.
    *   Proximidade geográfica.

### 3.3. Sistema de Match

*   **Match:** Um "match" ocorre quando dois usuários se curtem mutuamente.
*   **Notificação:** Ambos os usuários serão notificados quando um match acontecer.
*   **Lista de Matches:** Os matches serão exibidos em uma tela separada, permitindo o acesso às conversas.

### 3.4. Chat (Conversas)

*   **Início da Conversa:** Após um match, os usuários podem iniciar uma conversa por texto.
*   **Funcionalidades do Chat:**
    *   Troca de mensagens de texto.
    *   (Opcional para futuras versões) Envio de GIFs e emojis.

### 3.5. "Quem te Curtiu" (Funcionalidade Premium)

*   **Visão Geral:** Uma tela especial que mostrará uma grade de perfis de pessoas que já curtiram o usuário.
*   **Acesso:** Esta funcionalidade será parte de um plano de assinatura paga (Namorim Gold, por exemplo).
*   **Interação:** O usuário poderá visualizar esses perfis e dar "like" de volta para criar um match instantâneo.

## 4. Estrutura Técnica (Proposta Inicial)

*   **Frontend:** Aplicativo móvel (iOS e Android) ou Web App responsivo.
*   **Backend:** API REST para gerenciar usuários, perfis, likes, matches e chat.
*   **Banco de Dados:** Um banco de dados para armazenar as informações (Ex: PostgreSQL, MongoDB).
*   **Serviço de Mensageria:** Para o chat em tempo real (Ex: WebSockets).
