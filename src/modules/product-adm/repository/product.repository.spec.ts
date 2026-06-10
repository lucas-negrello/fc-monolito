import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";
import initSequelize from "../../@shared/test/init.sequelize";

describe('ProductRepository test', () => {
    initSequelize([ProductModel]);

    it('should create a product', async () => {
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 5,
        };
        const product = new Product(productProps);

        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({ where: { id: productProps.id.id } });

        expect(productProps.id.id).toEqual(productDb.get('id'));
        expect(productProps.name).toEqual(productDb.get('name'));
        expect(productProps.description).toEqual(productDb.get('description'));
        expect(productProps.purchasePrice).toEqual(productDb.get('purchasePrice'));
        expect(productProps.stock).toEqual(productDb.get('stock'));
    });

    it('should find a product', async () => {
        const productRepository = new ProductRepository();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1 description");
        expect(product.purchasePrice).toEqual(10);
        expect(product.stock).toEqual(5);
    });

});