import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create() {
        const transactionRepository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
        return {
            processPaymentUseCase: processPaymentUseCase,
        }
    }
}