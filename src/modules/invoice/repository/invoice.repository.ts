import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import {InvoiceModel} from "./invoice.model";
import {InvoiceItemModel} from "./invoice-item.model";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(input: Invoice): Promise<Invoice> {
        const items = input.items;

        const dbInvoice = await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            addressStreet: input.address.street,
            addressNumber: input.address.number,
            addressCity: input.address.city,
            addressComplement: input.address.complement,
            addressState: input.address.state,
            addressZipCode: input.address.zipCode,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        const invoiceId = dbInvoice.get("id");

        const dbItems: InvoiceItemModel[] = [];

        for (const item of items) {
            const dbItem = await InvoiceItemModel.create({
                id: item.id.id,
                invoiceId: invoiceId,
                name: item.name,
                price: item.price,
            });

            dbItems.push(dbItem);
        }

        const invoiceAddress = new Address(
            dbInvoice.get("addressStreet"),
            dbInvoice.get("addressNumber"),
            dbInvoice.get("addressComplement"),
            dbInvoice.get("addressCity"),
            dbInvoice.get("addressState"),
            dbInvoice.get("addressZipCode"),
        );

        const invoiceItems = dbItems.map((item) => new InvoiceItem({
            id: new Id(item.get("id")),
            name: item.get("name"),
            price: item.get("price"),
        }));

        return new Invoice({
            id: new Id(dbInvoice.get("id")),
            name: dbInvoice.get("name"),
            document: dbInvoice.get("document"),
            address: invoiceAddress,
            items: invoiceItems,
            createdAt: dbInvoice.get("createdAt"),
            updatedAt: dbInvoice.get("updatedAt"),
        });
    }

    async find(id: string): Promise<Invoice> {
        const dbInvoice = await InvoiceModel.findOne({
            where: { id },
            include: [InvoiceItemModel],
        });

        if (!dbInvoice) {
            throw new Error("Invoice not found");
        }

        const invoiceAddress = new Address(
            dbInvoice.get("addressStreet"),
            dbInvoice.get("addressNumber"),
            dbInvoice.get("addressComplement"),
            dbInvoice.get("addressCity"),
            dbInvoice.get("addressState"),
            dbInvoice.get("addressZipCode"),
        );

        const invoiceItems = dbInvoice.items.map((item) => new InvoiceItem({
            id: new Id(item.get("id")),
            name: item.get("name"),
            price: item.get("price"),
        }));

        return new Invoice({
            id: new Id(dbInvoice.get("id")),
            name: dbInvoice.get("name"),
            document: dbInvoice.get("document"),
            address: invoiceAddress,
            items: invoiceItems,
            createdAt: dbInvoice.get("createdAt"),
            updatedAt: dbInvoice.get("updatedAt"),
        });
    }
}