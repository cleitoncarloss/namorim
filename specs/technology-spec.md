# Especificação de Tecnologias: Namorim

## 1. Visão Geral

Este documento descreve a stack de tecnologias escolhida para o desenvolvimento do projeto **Namorim**. A seleção visa a agilidade no desenvolvimento, escalabilidade e a utilização de ferramentas modernas e eficientes.

## 2. Tecnologias Principais

### 2.1. Frontend

*   **Framework:** **React**
    *   **Justificativa:** Um ecossistema robusto e popular para a criação de interfaces de usuário dinâmicas e componentizadas. A equipe possui familiaridade com a tecnologia, o que acelera o desenvolvimento.

*   **Build Tool:** **Vite**
    *   **Justificativa:** Oferece uma experiência de desenvolvimento extremamente rápida com Hot Module Replacement (HMR) instantâneo e um processo de build otimizado. Não será utilizado TypeScript, mantendo a configuração mais simples com JavaScript (JSX).

*   **Linguagem:** **JavaScript (ES6+)**
    *   **Justificativa:** A opção por não utilizar TypeScript visa simplificar o setup inicial e acelerar a prototipagem, focando na entrega rápida de funcionalidades.

*   **Estilização:** (A definir)
    *   **Opções:** Tailwind CSS, Styled Components, ou CSS Modules. A decisão será tomada com base na preferência da equipe e na complexidade do design.

### 2.2. Backend e Base de Dados

*   **Plataforma:** **Supabase**
    *   **Justificativa:** Supabase é uma alternativa de código aberto ao Firebase que oferece um conjunto de ferramentas integradas sobre o PostgreSQL. Ele simplifica a criação do backend, fornecendo:
        *   **Banco de Dados PostgreSQL:** Uma base de dados relacional, poderosa e confiável.
        *   **Autenticação:** Gerenciamento de usuários, incluindo login com redes sociais.
        *   **APIs Instantâneas:** APIs RESTful e em tempo real (via WebSockets) geradas automaticamente a partir do schema do banco de dados.
        *   **Storage:** Para armazenamento de arquivos, como as fotos de perfil dos usuários.

### 2.3. Integrações e Outras Ferramentas

*   **MCP (Model-View-Controller):**
    *   **Status:** Já configurado no projeto.
    *   **Utilização:** Será utilizado para a lógica de negócio e interação entre o frontend e os serviços de backend, garantindo uma arquitetura organizada e desacoplada.

## 3. Arquitetura Proposta

A arquitetura seguirá o padrão cliente-servidor:

1.  **Cliente (Frontend):** Uma Single Page Application (SPA) construída com React e Vite, responsável por toda a interface do usuário.
2.  **Servidor (Backend):** A plataforma Supabase será o backend principal, gerenciando a base de dados, autenticação e o armazenamento de arquivos.
3.  **Comunicação:** O cliente React se comunicará com o Supabase através das APIs REST e de tempo real fornecidas pela plataforma. A lógica de controle no lado do cliente (parte do MCP) orquestrará essas chamadas.
