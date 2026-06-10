# FC Monolito

Monólito modular em TypeScript com módulos independentes (`client-adm`, `product-adm`, `store-catalog`, `payment`, `invoice`, `checkout`), seguindo Clean Architecture (domain, usecase, gateway, repository, facade, factory) e expondo uma API REST com Express.

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
2. `jest` — **toda** a suíte: testes unitários/integração dos módulos **e** os testes End-to-End (E2E) da API.

> **Não há comando separado para os E2E.** `npm run test` já executa unitários e E2E juntos, num único `jest`.

Os testes usam SQLite em memória (`sequelize` + `sqlite3`), então **não é necessário banco de dados externo**.

### Testes End-to-End (E2E)

Os testes E2E usam **Supertest** para exercitar a API HTTP de ponta a ponta e ficam em `src/api/routes/*.route.spec.ts` — um por endpoint, validando o status code (200/201) e o corpo da resposta. O `checkout.route.spec.ts` percorre o fluxo completo de compra (cliente → produto → checkout aprovado → consulta da nota).

Cada teste sobe um SQLite em memória e cria o schema via **migrations** (Umzug), não via `sync()` (veja [Migrations](#migrations)).

Para rodar apenas um subconjunto:

```bash
# Somente os testes E2E da API
npx jest src/api

# Somente os testes dos módulos (unitários/integração)
npx jest src/modules

# Um arquivo específico
npx jest src/api/routes/checkout.route.spec.ts
```

## Rodar o servidor (API)

```bash
# desenvolvimento (reinicia ao salvar)
npm run dev

# execução simples
npm start
```

O servidor sobe em `http://localhost:3000` (configurável via variável de ambiente `PORT`). No boot, ele cria um SQLite em arquivo (`database.sqlite`) e aplica as migrations automaticamente.

### Endpoints

Exemplo de fluxo completo com `curl`:

```bash
# 1. Cadastra um cliente
curl -X POST http://localhost:3000/clients -H 'Content-Type: application/json' -d '{
  "name": "Client 1", "email": "client1@example.com", "document": "12345678900",
  "address": { "street": "Main Street", "number": "123", "complement": "Apt 1",
               "city": "Springfield", "state": "SP", "zipCode": "12345-678" }
}'

# 2. Cadastra um produto (purchasePrice >= 100 garante a aprovação do pagamento)
curl -X POST http://localhost:3000/products -H 'Content-Type: application/json' -d '{
  "name": "Product 1", "description": "Product 1 description",
  "purchasePrice": 150, "stock": 10
}'

# 3. Realiza o checkout (use os ids retornados acima)
curl -X POST http://localhost:3000/checkout -H 'Content-Type: application/json' -d '{
  "clientId": "<id-do-cliente>", "products": [{ "productId": "<id-do-produto>" }]
}'

# 4. Consulta a nota fiscal gerada (invoiceId retornado pelo checkout)
curl http://localhost:3000/invoice/<invoiceId>
```

## Migrations

As migrations ficam em `src/infrastructure/migrations/migrations/` e são aplicadas automaticamente no boot do servidor e em cada teste E2E. Para rodá-las manualmente contra o banco em arquivo:

```bash
npm run migrate -- up     # aplica todas as migrations
npm run migrate -- down   # reverte a última migration
```
