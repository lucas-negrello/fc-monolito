import Transaction from "../../domain/transaction";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProcessPaymentUseCase from "./process-payment.usecase";
import PaymentGateway from "../../gateway/payment.gateway";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});

const MockRepository = () => ({
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
});

const transaction2 = new Transaction({
    id: new Id("2"),
    amount: 50,
    orderId: "2",
    status: "declined",
});

const MockRepositoryDeclined = () => ({
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
});

describe("Process Payment UseCase unit test", () => {
    it('should process payment', async () => {
        const paymentRepository: PaymentGateway = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input: ProcessPaymentInputDto = {
            orderId: "1",
            amount: 100,
        };

        const result: ProcessPaymentOutputDto = await usecase.execute(input);

        expect(result.transactionId).toEqual(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toEqual(100);
        expect(result.orderId).toEqual("1");
        expect(result.createdAt).toStrictEqual(transaction.createdAt);
        expect(result.updatedAt).toStrictEqual(transaction.updatedAt);
    });

    it('should decline a transaction', async () => {
        const paymentRepository: PaymentGateway = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input: ProcessPaymentInputDto = {
            orderId: "2",
            amount: 50,
        };

        const result: ProcessPaymentOutputDto = await usecase.execute(input);

        expect(result.transactionId).toEqual(transaction2.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toEqual(50);
        expect(result.orderId).toEqual("2");
        expect(result.createdAt).toStrictEqual(transaction2.createdAt);
        expect(result.updatedAt).toStrictEqual(transaction2.updatedAt);
    });
})