import InvoiceItem from "../../domain/invoice-item";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import FindInvoiceUseCase from "./find-invoice.usecase";
import Address from "../../../@shared/domain/value-object/address";

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

const MockRepository = () => ({
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe('FindInvoiceUseCase Test', () => {
    it('should find a invoice', async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);
        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(repository.find).toBeCalled();
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
        expect(result.items[0].name).toBe("item-1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("item-2");
        expect(result.items[1].price).toBe(200);

        expect(result.total).toBe(300);
    });
});