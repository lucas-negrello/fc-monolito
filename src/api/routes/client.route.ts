import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/facade.factory";
import Address from "../../modules/@shared/domain/value-object/address";
import Id from "../../modules/@shared/domain/value-object/id.value-object";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create();
    try {
        const id = req.body.id ?? new Id().id;
        const address = new Address(
            req.body.address?.street,
            req.body.address?.number,
            req.body.address?.complement,
            req.body.address?.city,
            req.body.address?.state,
            req.body.address?.zipCode
        );

        await facade.add({
            id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address,
        });

        const client = await facade.find({ id });

        res.status(201).send({
            id: client.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: {
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zipCode,
            },
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    } catch (err) {
        res.status(500).send({ message: (err as Error).message });
    }
});
