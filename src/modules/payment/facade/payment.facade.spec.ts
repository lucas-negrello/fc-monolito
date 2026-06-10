import initSequelize from "../../@shared/test/init.sequelize";
import {TransactionModel} from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/facade.factory";

describe('PaymentFacade test', () => {
    initSequelize([TransactionModel]);

    it('should create a transaction', async () => {
        const paymentFacade = PaymentFacadeFactory.create();

        const input = {
            orderId: "order-1",
            amount: 100,
        };

        const result = await paymentFacade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
    });
});