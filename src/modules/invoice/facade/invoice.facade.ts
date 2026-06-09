import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto,
    InvoiceFacadeInterface
} from "./invoice.facade.interface";

export interface UseCasesProps {
    generateInvoice: UseCaseInterface,
    findInvoice: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private readonly _generateInvoice: UseCaseInterface;
    private readonly _findInvoice: UseCaseInterface;

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