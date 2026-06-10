import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {FindProductInputDto, FindProductOutputDto} from "../usecase/find-product/find-product.dto";
import {FindAllProductsInputDto, FindAllProductsOutputDto} from "../usecase/find-all-products/find-all-products.dto";

export interface UseCaseProps {
    findUseCase: UseCaseInterface<FindProductInputDto, FindProductOutputDto>;
    findAllUseCase: UseCaseInterface<FindAllProductsInputDto, FindAllProductsOutputDto>;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private readonly _findUseCase: UseCaseInterface<FindProductInputDto, FindProductOutputDto>;
    private readonly _findAllUseCase: UseCaseInterface<FindAllProductsInputDto, FindAllProductsOutputDto>;

    constructor(usecasesProps: UseCaseProps) {
        this._findUseCase = usecasesProps.findUseCase;
        this._findAllUseCase = usecasesProps.findAllUseCase;
    }

    async find(props: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(props);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute({});
    }

}