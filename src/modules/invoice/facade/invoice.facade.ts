import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto,
    InvoiceFacadeInterface
} from "./invoice.facade.interface";
import {
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate-invoice/generate-invoice.dto";
import {FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto} from "../usecase/find-invoice/find-invoice.dto";

export interface UseCasesProps {
    generateInvoice: UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto>,
    findInvoice: UseCaseInterface<FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto>,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private readonly _generateInvoice: UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto>;
    private readonly _findInvoice: UseCaseInterface<FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto>;

    constructor(useCasesProps: UseCasesProps) {
        this._generateInvoice = useCasesProps.generateInvoice;
        this._findInvoice = useCasesProps.findInvoice;
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateInvoice.execute(input);
    }
    async findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findInvoice.execute(input);
    }

}