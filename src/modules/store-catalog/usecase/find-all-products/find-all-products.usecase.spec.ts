import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductGateway from "../../gateway/product.gateway";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salePrice: 10,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Description 2",
    salePrice: 20,
});

const MockRepository = () => ({
   find: jest.fn(),
   findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
});

describe('Find All Products Usecase unit test', () => {
    it('Should find all products', async () => {
        const productRepository: ProductGateway = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute({});

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product1.id.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].description).toBe(product1.description);
        expect(result.products[0].salePrice).toBe(product1.salePrice);
        expect(result.products[1].id).toBe(product2.id.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].description).toBe(product2.description);
        expect(result.products[1].salePrice).toBe(product2.salePrice);
    });
})