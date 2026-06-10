import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductGateway from "../../gateway/product.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class AddProductUseCase implements UseCaseInterface<AddProductInputDto, AddProductOutputDto> {

    constructor(
        private readonly _productRepository: ProductGateway
    ) {}

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        };

        const product = new Product(props);

        await this._productRepository.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}