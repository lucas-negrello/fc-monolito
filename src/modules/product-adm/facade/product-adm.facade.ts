import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    AddProductFacadeOutputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto
} from "./product-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {AddProductInputDto, AddProductOutputDto} from "../usecase/add-product/add-product.dto";
import {CheckStockInputDto, CheckStockOutputDto} from "../usecase/check-stock/check-stock.dto";

export interface UseCasesProps {
    addUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    stockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private readonly _addUsecase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    private readonly _checkStockUsecase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;

    constructor(
        usecasesProps: UseCasesProps,
    ) {
        this._addUsecase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
        return await this._addUsecase.execute(input);
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return await this._checkStockUsecase.execute(input);
    }
}