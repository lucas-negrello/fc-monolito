import initSequelize from "../../@shared/test/init.sequelize";
import {ClientModel} from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import Address from "../../@shared/domain/value-object/address";

describe('ClientAdmFacade test', () => {
    initSequelize([ClientModel]);

    it('Should create a client', async () => {
        const clientFacade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Lucian",
            email: "lucian@xpto.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888",
            )
        };

        await clientFacade.add(input);

        const client = await ClientModel.findOne({ where: { id: input.id } });

        expect(client).toBeDefined()
        expect(client.get("id")).toBe(input.id)
        expect(client.get("name")).toBe(input.name)
        expect(client.get("email")).toBe(input.email)
        expect(client.get("document")).toBe(input.document)
        expect(client.get("street")).toBe(input.address.street)
    })

    it('should find a client', async () => {
        const clientFacade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Lucian",
            email: "lucian@xpto.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            )
        }

        await clientFacade.add(input);

        const client = await clientFacade.find({ id: "1" });

        expect(client).toBeDefined()
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.document).toBe(input.document)
        expect(client.address.street).toBe(input.address.street)
        expect(client.address.number).toBe(input.address.number)
        expect(client.address.complement).toBe(input.address.complement)
        expect(client.address.city).toBe(input.address.city)
        expect(client.address.state).toBe(input.address.state)
        expect(client.address.zipCode).toBe(input.address.zipCode)
    });
});