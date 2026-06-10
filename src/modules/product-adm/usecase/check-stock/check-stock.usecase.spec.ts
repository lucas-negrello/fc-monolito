import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 10,
    stock: 5,
});

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('CheckStock Product usecase unit test', () => {
    it('should get stock of a product', async () => {
        const productRepository: ProductGateway = MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const input: CheckStockInputDto = {
            productId: "1"
        };

        const result: CheckStockOutputDto = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toEqual(product.id.id);
        expect(result.stock).toEqual(product.stock);
    });
});