import request from "supertest";
import { app } from "../express";
import initApiDb from "../test/init-api-db";

describe("E2E - POST /checkout", () => {
    initApiDb();

    it("should place an order processing the full purchase flow", async () => {
        // Arrange: cria cliente via HTTP
        const clientResponse = await request(app)
            .post("/clients")
            .send({
                name: "Client 1",
                email: "client1@example.com",
                document: "12345678900",
                address: {
                    street: "Main Street",
                    number: "123",
                    complement: "Apt 1",
                    city: "Springfield",
                    state: "SP",
                    zipCode: "12345-678",
                },
            });
        expect(clientResponse.status).toBe(201);
        const clientId = clientResponse.body.id;

        // Arrange: cria produto via HTTP (purchasePrice >= 100 garante aprovação
        // do pagamento, pois o salePrice assume o purchasePrice)
        const productResponse = await request(app).post("/products").send({
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 150,
            stock: 10,
        });
        expect(productResponse.status).toBe(201);
        const productId = productResponse.body.id;

        // Act: realiza o checkout
        const response = await request(app)
            .post("/checkout")
            .send({
                clientId,
                products: [{ productId }],
            });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(150);
        expect(response.body.products).toHaveLength(1);
        expect(response.body.products[0].productId).toBe(productId);

        // Assert: a nota fiscal gerada é consultável pela rota de invoice
        const invoiceResponse = await request(app).get(
            `/invoice/${response.body.invoiceId}`
        );
        expect(invoiceResponse.status).toBe(200);
        expect(invoiceResponse.body.total).toBe(150);
    });

    it("should return 500 when client does not exist", async () => {
        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "non-existent",
                products: [{ productId: "non-existent" }],
            });

        expect(response.status).toBe(500);
    });
});
