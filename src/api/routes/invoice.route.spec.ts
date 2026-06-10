import request from "supertest";
import { app } from "../express";
import initApiDb from "../test/init-api-db";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";

describe("E2E - GET /invoice/:id", () => {
    initApiDb();

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        const invoice = await facade.generateInvoice({
            name: "Client 1",
            document: "12345678900",
            street: "Main Street",
            number: "123",
            complement: "Apt 1",
            city: "Springfield",
            state: "SP",
            zipCode: "12345-678",
            items: [
                { id: "1", name: "Item 1", price: 100 },
                { id: "2", name: "Item 2", price: 200 },
            ],
        });

        const response = await request(app).get(`/invoice/${invoice.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(invoice.id);
        expect(response.body.name).toBe("Client 1");
        expect(response.body.document).toBe("12345678900");
        expect(response.body.address.street).toBe("Main Street");
        expect(response.body.address.number).toBe("123");
        expect(response.body.address.complement).toBe("Apt 1");
        expect(response.body.address.city).toBe("Springfield");
        expect(response.body.address.state).toBe("SP");
        expect(response.body.address.zipCode).toBe("12345-678");
        expect(response.body.items).toHaveLength(2);
        expect(response.body.total).toBe(300);
    });

    it("should return 500 when invoice does not exist", async () => {
        const response = await request(app).get("/invoice/non-existent-id");

        expect(response.status).toBe(500);
    });
});
