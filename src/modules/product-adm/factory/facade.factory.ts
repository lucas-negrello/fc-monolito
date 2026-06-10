import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const stockUseCase = new CheckStockUseCase(productRepository);
        return new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: stockUseCase,
        });
    }
}