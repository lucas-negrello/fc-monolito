import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map((product) => new Product({
            id: new Id(product.get('id')),
            name: product.get('name'),
            description: product.get('description'),
            salePrice: product.get('salePrice'),
        }));
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id } });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return new Product({
            id: new Id(product.get('id')),
            name: product.get('name'),
            description: product.get('description'),
            salePrice: product.get('salePrice'),
        });
    }

}