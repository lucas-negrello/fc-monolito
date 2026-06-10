import Client from "../../domain/client.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientGateway from "../../gateway/client.gateway";
import {FindClientInputDto, FindClientOutputDto} from "./find-client.dto";
import FindClientUseCase from "./find-client.usecase";
import Address from "../../../@shared/domain/value-object/address";

const client = new Client({
    id: new Id("1"),
    name: "Lucian",
    email: "lucian@123.com",
    document: "1234-5678",
    address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
    )
})

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe('Find Client Usecase unit test', () => {
    it('should find a client', async () => {
        const clientRepository: ClientGateway = MockRepository();
        const usecase = new FindClientUseCase(clientRepository);

        const input: FindClientInputDto = {
            id: "1"
        };

        const result: FindClientOutputDto = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toEqual(client.id.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });
});