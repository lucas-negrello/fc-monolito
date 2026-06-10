import initSequelize from "../../@shared/test/init.sequelize";
import {ClientModel} from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";

describe('ClientRepository test', () => {
    initSequelize([ClientModel]);

    it("should create a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Lucian",
            email: "lucian@teste.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            )
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const clientDb = await ClientModel.findOne({ where: { id: "1" } })

        expect(clientDb).toBeDefined()
        expect(clientDb.get("id")).toEqual(client.id.id)
        expect(clientDb.get("name")).toEqual(client.name)
        expect(clientDb.get("email")).toEqual(client.email)
        expect(clientDb.get("document")).toEqual(client.document)
        expect(clientDb.get("street")).toEqual(client.address.street)
        expect(clientDb.get("number")).toEqual(client.address.number)
        expect(clientDb.get("complement")).toEqual(client.address.complement)
        expect(clientDb.get("city")).toEqual(client.address.city)
        expect(clientDb.get("state")).toEqual(client.address.state)
        expect(clientDb.get("zipcode")).toEqual(client.address.zipCode)
        expect(clientDb.get("createdAt")).toStrictEqual(client.createdAt)
        expect(clientDb.get("updatedAt")).toStrictEqual(client.updatedAt)
    })

    it("should find a client", async () => {

        const client = await ClientModel.create({
            id: '1',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888-888",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository()
        const result = await repository.find("1")

        expect(result.id.id).toEqual(client.get("id"))
        expect(result.name).toEqual(client.get("name"))
        expect(result.email).toEqual(client.get("email"))
        expect(result.address.street).toEqual(client.get("street"))
        expect(result.address.number).toEqual(client.get("number"))
        expect(result.address.complement).toEqual(client.get("complement"))
        expect(result.address.city).toEqual(client.get("city"))
        expect(result.address.state).toEqual(client.get("state"))
        expect(result.address.zipCode).toEqual(client.get("zipcode"))
        expect(result.createdAt).toStrictEqual(client.get("createdAt"))
        expect(result.updatedAt).toStrictEqual(client.get("updatedAt"))
    })
});