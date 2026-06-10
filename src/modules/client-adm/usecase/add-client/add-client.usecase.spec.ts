import ClientGateway from "../../gateway/client.gateway";
import {AddClientOutputDto} from "./add-client.dto";
import AddClientUseCase from "./add-client.usecase";
import Address from "../../../@shared/domain/value-object/address";

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn(),
});

describe('Add Client UseCase Unit Test', () => {
    it('should add a client', async () => {
        const clientRepository: ClientGateway = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);

        const input = {
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
        }

        const result: AddClientOutputDto = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    });
});