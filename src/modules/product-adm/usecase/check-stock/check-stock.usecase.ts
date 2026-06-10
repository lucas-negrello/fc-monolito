import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";
import ProductGateway from "../../gateway/product.gateway";

export default class CheckStockUseCase implements UseCaseInterface<CheckStockInputDto, CheckStockOutputDto> {
    constructor(
        private readonly productRepository: ProductGateway,
    ) {}
    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this.productRepository.find(input.productId);

        return {
            productId: product.id.id,
            stock: product.stock,
        }
    }
}