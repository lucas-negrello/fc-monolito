import {InvoiceModel} from "./invoice.model";
import {InvoiceItemModel} from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";
import InvoiceItem from "../domain/invoice-item";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import Address from "../../@shared/domain/value-object/address";
import initSequelize from "../../@shared/test/init.sequelize";

const address = new Address(
    "Street",
    "123",
    "Complement",
    "City",
    "State",
    "ZipCode"
);

const item1 = new InvoiceItem({
    id: new Id("1"),
    name: "item-1",
    price: 100,
});
const item2 = new InvoiceItem({
    id: new Id("2"),
    name: "item-2",
    price: 200,
});
const items = [item1, item2];

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "Document 1",
    address: address,
    items: items,
});

describe("InvoiceRepository test", () => {
    initSequelize([InvoiceModel, InvoiceItemModel]);

    it('should generate a invoice', async () => {
        const repository = new InvoiceRepository();

        const result = await repository.generate(invoice);

        expect(result.id.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.address.street).toBe("Street");
        expect(result.address.number).toBe("123");
        expect(result.address.complement).toBe("Complement");
        expect(result.address.city).toBe("City");
        expect(result.address.state).toBe("State");
        expect(result.address.zipCode).toBe("ZipCode");

        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe("1");
        expect(result.items[0].name).toBe("item-1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id.id).toBe("2");
        expect(result.items[1].name).toBe("item-2");
        expect(result.items[1].price).toBe(200);

        expect(result.total).toBe(300);

        const foundInvoice = await InvoiceModel.findOne({
            where: {id: "1"},
            include: [{model: InvoiceItemModel, as: "items"}],
        });

        expect(foundInvoice).not.toBeNull();
        expect(foundInvoice.get("id")).toBe("1");
        expect(foundInvoice.get("name")).toBe("Invoice 1");
        expect(foundInvoice.get("document")).toBe("Document 1");
        expect(foundInvoice.get("addressStreet")).toBe("Street");
        expect(foundInvoice.get("addressNumber")).toBe("123");
        expect(foundInvoice.get("addressComplement")).toBe("Complement");
        expect(foundInvoice.get("addressCity")).toBe("City");
        expect(foundInvoice.get("addressState")).toBe("State");
        expect(foundInvoice.get("addressZipCode")).toBe("ZipCode");
        expect(foundInvoice.items.length).toBe(2);
        expect(foundInvoice.items[0].get("id")).toBe("1");
        expect(foundInvoice.items[0].get("name")).toBe("item-1");
        expect(foundInvoice.items[0].get("price")).toBe(100);
        expect(foundInvoice.items[1].get("id")).toBe("2");
        expect(foundInvoice.items[1].get("name")).toBe("item-2");
        expect(foundInvoice.items[1].get("price")).toBe(200);
    });

    it('should find a invoice', async () => {
        const repository = new InvoiceRepository();

        const createdInvoice = await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            addressStreet: invoice.address.street,
            addressNumber: invoice.address.number,
            addressComplement: invoice.address.complement,
            addressCity: invoice.address.city,
            addressState: invoice.address.state,
            addressZipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });

        const createdInvoiceItem1 = await InvoiceItemModel.create({
            id: item1.id.id,
            invoiceId: createdInvoice.get("id"),
            name: item1.name,
            price: item1.price,
        });

        const createdInvoiceItem2 = await InvoiceItemModel.create({
            id: item2.id.id,
            invoiceId: createdInvoice.get("id"),
            name: item2.name,
            price: item2.price,
        });

        const result = await repository.find(invoice.id.id);

        expect(result.id.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.address.street).toBe("Street");
        expect(result.address.number).toBe("123");
        expect(result.address.complement).toBe("Complement");
        expect(result.address.city).toBe("City");
        expect(result.address.state).toBe("State");
        expect(result.address.zipCode).toBe("ZipCode");

        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe("1");
        expect(result.items[0].name).toBe("item-1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id.id).toBe("2");
        expect(result.items[1].name).toBe("item-2");
        expect(result.items[1].price).toBe(200);

        expect(result.total).toBe(300);
    });

});