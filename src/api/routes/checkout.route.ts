import express, { Request, Response } from "express";
import CheckoutFactory from "../../modules/checkout/factory/checkout.factory";
import { PlaceOrderInputDto } from "../../modules/checkout/usecase/place-order/place-order.dto";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const usecase = CheckoutFactory.create();
    try {
        const input: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };

        const output = await usecase.execute(input);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send({ message: (err as Error).message });
    }
});
