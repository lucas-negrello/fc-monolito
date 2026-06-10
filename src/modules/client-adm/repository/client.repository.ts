import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";

export default class ClientRepository implements ClientGateway {

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipcode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: { id } });

        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        return new Client({
            id: new Id(client.get('id')),
            name: client.get('name'),
            email: client.get('email'),
            document: client.get("document"),
            address: new Address(
                client.get("street"),
                client.get("number"),
                client.get("complement"),
                client.get("city"),
                client.get("state"),
                client.get("zipcode"),
            ),
            createdAt: client.get('createdAt'),
            updatedAt: client.get('updatedAt'),
        });
    }

}