import {PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto} from "./payment.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "../usecase/process-payment/process-payment.dto";

export interface UseCasesProps {
    processPaymentUseCase: UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto>;
}

export default class PaymentFacade implements PaymentFacadeInterface {
    private readonly _processPaymentUseCase: UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto>;

    constructor(useCasesProps: UseCasesProps) {
        this._processPaymentUseCase = useCasesProps.processPaymentUseCase;
    }

    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this._processPaymentUseCase.execute(input);
    }
}