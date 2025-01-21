# microservices-architecture

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
│   │   ├── auth.service.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   └── credentials.model.ts
│   │   └── errors/
│   │       └── auth-errors.ts
│   ├── catalog/ ... Serviço de catálogo
│   │   └── catalog.service.ts
│   ├── order/ ... Serviço de pedidos
│   │   └── order.service.ts
│   └── payment/ ... Serviço de pagamento
│       └── payment.service.ts
└── index.ts ... Ponto de entrada da aplicação
```
