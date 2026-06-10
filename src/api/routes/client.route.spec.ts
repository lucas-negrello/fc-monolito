import request from "supertest";
import { app } from "../express";
import initApiDb from "../test/init-api-db";

describe("E2E - POST /clients", () => {
    initApiDb();

    it("should create a client", async () => {
        const response = await request(app)
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

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Client 1");
        expect(response.body.email).toBe("client1@example.com");
        expect(response.body.document).toBe("12345678900");
        expect(response.body.address.street).toBe("Main Street");
        expect(response.body.address.number).toBe("123");
        expect(response.body.address.complement).toBe("Apt 1");
        expect(response.body.address.city).toBe("Springfield");
        expect(response.body.address.state).toBe("SP");
        expect(response.body.address.zipCode).toBe("12345-678");
    });
});
