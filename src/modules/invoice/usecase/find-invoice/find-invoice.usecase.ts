import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto} from "./find-invoice.dto";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Invoice from "../../domain/invoice";

export default class FindInvoiceUseCase implements UseCaseInterface {
    constructor(
        private readonly _invoiceRepository: InvoiceGateway
    ) {}

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const result = await this._invoiceRepository.find(input.id);

        if (!result) {
            throw new Error("Invoice not found");
        }

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            total: result.total,
            items: result.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            address: {
                city: result.address.city,
                complement: result.address.complement,
                number: result.address.number,
                state: result.address.state,
                street: result.address.street,
                zipCode: result.address.zipCode,
            },
            createdAt: result.createdAt,
        };
    }

}