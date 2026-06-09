import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    constructor(
        private readonly _invoiceRepository: InvoiceGateway
    ) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode
        );

        const items = input.items.map((item) => new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        }));

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address,
            items,
        });

        const generatedInvoice = await this._invoiceRepository.generate(invoice);

        return {
            id: generatedInvoice.id.id,
            name: generatedInvoice.name,
            document: generatedInvoice.document,
            state: generatedInvoice.address.state,
            street: generatedInvoice.address.street,
            total: generatedInvoice.total,
            zipCode: generatedInvoice.address.zipCode,
            city: generatedInvoice.address.city,
            complement: generatedInvoice.address.complement,
            number: generatedInvoice.address.number,
            items: generatedInvoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
        };
    }
}