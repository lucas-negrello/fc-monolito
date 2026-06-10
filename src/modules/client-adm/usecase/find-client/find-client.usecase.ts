import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindClientInputDto, FindClientOutputDto} from "./find-client.dto";
import ClientGateway from "../../gateway/client.gateway";
import Address from "../../../@shared/domain/value-object/address";

export default class FindClientUseCase implements UseCaseInterface<FindClientInputDto, FindClientOutputDto> {

    constructor(
        private readonly _clientRepository: ClientGateway
    ) {}

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this._clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
                client.address.street,
                client.address.number,
                client.address.complement,
                client.address.city,
                client.address.state,
                client.address.zipCode,
            ),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }

}