import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import {FindProductInputDto, FindProductOutputDto} from "./find-product.dto";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salePrice: 10,
});

const MockRepository = () => ({
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('Find a product usecase unit test', () => {
    it('should find a product', async () => {
        const productRepository: ProductGateway = MockRepository();
        const usecase: UseCaseInterface<FindProductInputDto, FindProductOutputDto> = new FindProductUseCase(productRepository);

        const input: FindProductInputDto = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salePrice).toBe(product.salePrice);
    });
});