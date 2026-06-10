import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import ProductGateway from "../../gateway/product.gateway";
import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn(),
});

describe('Add Product usecase unit test', () => {

    it('should add a product', async () => {
        const productRepository: ProductGateway = MockRepository();
        const usecase = new AddProductUseCase(productRepository);

        const input: AddProductInputDto = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 5,
        };

        const result: AddProductOutputDto = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

});