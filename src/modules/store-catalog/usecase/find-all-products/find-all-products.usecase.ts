import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindAllProductsInputDto, FindAllProductsOutputDto} from "./find-all-products.dto";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements UseCaseInterface<FindAllProductsInputDto, FindAllProductsOutputDto> {
    constructor(
        private readonly _productRepository: ProductGateway
    ) {}

    async execute(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
        const products = await this._productRepository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salePrice: product.salePrice,
            }))
        }
    }

}