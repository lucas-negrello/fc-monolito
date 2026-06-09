# FC Monolito

Monólito modular em TypeScript com módulos independentes (`client-adm`, `product-adm`, `store-catalog`, `payment`, `invoice`), seguindo Clean Architecture (domain, usecase, gateway, repository, facade, factory).

## Requisitos

- Node.js 18+ (testado com Node 22)
- npm

## Instalação

```bash
npm install
```

## Rodar os testes

```bash
npm test
```

O comando executa, em sequência:

1. `tsc --noEmit` — checagem de tipos (falha se houver erro de tipagem);
2. `jest` — toda a suíte de testes.

Os testes usam SQLite em memória (`sequelize` + `sqlite3`), então **não é necessário banco de dados externo**.
