# Arquitetura de Microsserviços - Sistema de Gerenciamento de Pedidos

Este projeto é uma simulação de uma arquitetura de microsserviços para um sistema de gerenciamento de pedidos, desenvolvido como parte da Lista 3 da disciplina ES46A - Arquitetura De Software.

## 🎯 Visão Geral do Projeto

O sistema é composto por um cliente (index.ts) principal, que interage com os microsserviços.

## 👥 Autores

- [Victor Motta de Oliveira](https://github.com/mottapng)
- [Andre Luis Alves Tavares](https://github.com/andret22)
- [Vitor Encinas Negrão de Tulio](https://github.com/Vitortulio)

### 🏗️ Arquitetura

O sistema é composto por quatro microsserviços principais:

1. **Serviço de Autenticação**

   - Gerenciamento de login de usuários
   - Validação de sessão
   - Verificação de credenciais

2. **Serviço de Catálogo**

   - Gerenciamento de produtos
   - Controle de estoque
   - Listagem de produtos

3. **Serviço de Pedidos**

   - Criação de pedidos
   - Gerenciamento de status
   - Cálculo de total

4. **Serviço de Pagamentos**
   - Processamento de pagamentos
   - Gerenciamento de status de pagamento
   - Atualização de status de pedidos

### 📁 Estrutura do Projeto

```console
src/
├── core/ ... Tipagens e utilitários comuns
│   ├── types/
│   │   ├── result.type.ts
│   │   └── error.type.ts
│   └── utils/
│       └── logger.ts
├── services/ ... Microsserviços
│   ├── auth/ ... Serviço de autenticação
│   │   └── auth.service.ts
│   ├── catalog/ ... Serviço de catálogo
│   │   └── catalog.service.ts
│   ├── order/ ... Serviço de pedidos
│   │   └── order.service.ts
│   └── payment/ ... Serviço de pagamento
│       └── payment.service.ts
└── index.ts ... Ponto de entrada da aplicação
```

## 💻 Tecnologias Utilizadas

- Node.js (>=18.0.0)
- TypeScript

## 🏃‍♂️ Executando o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Execute em modo de desenvolvimento:

```bash
npm run dev
```

## 🔄 Fluxo de execução do Sistema

![Fluxo do Sistema](https://github.com/mottapng/microservices-architecture/blob/main/fluxogram.png)
