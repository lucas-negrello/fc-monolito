import ProductModel from "../repository/product.model";
import initSequelize from "../../@shared/test/init.sequelize";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe('ProductAdmFacade test', () => {
    initSequelize([ProductModel]);

    it('should create a product', async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product description",
            purchasePrice: 10,
            stock: 5,
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: input.id } });

        expect(product).toBeDefined();
        expect(product.get('id')).toBe(input.id);
        expect(product.get('name')).toBe(input.name);
        expect(product.get('description')).toBe(input.description);
        expect(product.get('purchasePrice')).toBe(input.purchasePrice);
        expect(product.get('stock')).toBe(input.stock);
    });

    it('should check product stock', async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product description",
            purchasePrice: 10,
            stock: 5,
        };

        await productFacade.addProduct(input);

        const product = await productFacade.checkStock({ productId: input.id });

        expect(product).toBeDefined();
        expect(product.productId).toBe(input.id);
        expect(product.stock).toBe(input.stock);
    });
});