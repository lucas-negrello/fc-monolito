import initSequelize from "../../@shared/test/init.sequelize";
import {TransactionModel} from "./transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionRepository from "./transaction.repository";

describe('Transaction Repository unit test', () => {
    initSequelize([TransactionModel]);

    it('should save a transaction', async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
        });

        transaction.approve();

        const transactionRepository = new TransactionRepository();
        const result = await transactionRepository.save(transaction);

        expect(result.id.id).toEqual(transaction.id.id);
        expect(result.amount).toEqual(transaction.amount);
        expect(result.orderId).toEqual(transaction.orderId);
    });
});