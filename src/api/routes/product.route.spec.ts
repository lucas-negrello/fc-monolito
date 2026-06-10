import request from "supertest";
import { app } from "../express";
import initApiDb from "../test/init-api-db";

describe("E2E - POST /products", () => {
    initApiDb();

    it("should create a product", async () => {
        const response = await request(app).post("/products").send({
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 120,
            stock: 10,
        });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Product 1 description");
        expect(response.body.purchasePrice).toBe(120);
        expect(response.body.stock).toBe(10);
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.updatedAt).toBeDefined();
    });

    it("should return 500 when payload is invalid", async () => {
        const response = await request(app).post("/products").send({});

        expect(response.status).toBe(500);
    });
});
