import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import {GenerateInvoiceUseCaseInputDto} from "./generate-invoice.dto";

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
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn(),
});

describe('GenerateInvoiceUseCase Test', () => {
    it('should generate a invoice', async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);
        const input: GenerateInvoiceUseCaseInputDto = {
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

        const result = await usecase.execute(input);

        expect(repository.generate).toBeCalled();
        expect(result.id).toBe("1");
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
});