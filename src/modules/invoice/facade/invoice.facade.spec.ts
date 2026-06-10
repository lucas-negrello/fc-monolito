import {InvoiceModel} from "../repository/invoice.model";
import {InvoiceItemModel} from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/facade.factory";
import initSequelize from "../../@shared/test/init.sequelize";

describe("InvoiceFacade test", () => {
    initSequelize([InvoiceModel, InvoiceItemModel]);

    it('should generate a invoice', async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();
        const input = {
            name: "Invoice 1",
            document: "Document 1",
            state: "State",
            city: "City",
            complement: "Complement",
            number: "123",
            street: "Street",
            zipCode: "ZipCode",
            items: [
                {
                    id: "1",
                    name: "item-1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "item-2",
                    price: 200,
                }
            ]
        };

        const result = await invoiceFacade.generateInvoice.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.street).toBe("Street");
        expect(result.number).toBe("123");
        expect(result.complement).toBe("Complement");
        expect(result.city).toBe("City");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("ZipCode");

        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("item-1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("item-2");
        expect(result.items[1].price).toBe(200);

        expect(result.total).toBe(300);
    });

    it('should find a invoice', async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();
        await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            addressStreet: "Street",
            addressNumber: "123",
            addressCity: "City",
            addressComplement: "Complement",
            addressState: "State",
            addressZipCode: "ZipCode",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await InvoiceItemModel.create({
            id: "1",
            invoiceId: "1",
            name: "Item 1",
            price: 100,
        });
        await InvoiceItemModel.create({
            id: "2",
            invoiceId: "1",
            name: "Item 2",
            price: 200,
        });

        const input = {
            id: "1"
        };

        const result = await invoiceFacade.findInvoice.execute(input);

        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.address.street).toBe("Street");
        expect(result.address.number).toBe("123");
        expect(result.address.complement).toBe("Complement");
        expect(result.address.city).toBe("City");
        expect(result.address.state).toBe("State");
        expect(result.address.zipCode).toBe("ZipCode");

        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(200);

        expect(result.total).toBe(300);
    });
});