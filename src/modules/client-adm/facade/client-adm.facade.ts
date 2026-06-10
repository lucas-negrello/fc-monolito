import {ClientAdmFacadeInterface} from "./client-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {AddClientInputDto, AddClientOutputDto} from "../usecase/add-client/add-client.dto";
import {FindClientInputDto, FindClientOutputDto} from "../usecase/find-client/find-client.dto";

export interface UseCasesProps {
    addUseCase: UseCaseInterface<AddClientInputDto, AddClientOutputDto>,
    findUseCase: UseCaseInterface<FindClientInputDto, FindClientOutputDto>,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private readonly _addUsecase: UseCaseInterface<AddClientInputDto, AddClientOutputDto>;
    private readonly _findUsecase: UseCaseInterface<FindClientInputDto, FindClientOutputDto>;

    constructor(
        usecasesProps: UseCasesProps,
    ) {
        this._addUsecase = usecasesProps.addUseCase;
        this._findUsecase = usecasesProps.findUseCase;
    }

    async add(input: AddClientInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientInputDto): Promise<FindClientOutputDto> {
        return await this._findUsecase.execute(input);
    }
}