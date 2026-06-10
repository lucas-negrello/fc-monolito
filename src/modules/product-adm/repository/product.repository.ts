import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
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
            purchasePrice: product.get('purchasePrice'),
            stock: product.get('stock'),
            createdAt: product.get('createdAt'),
            updatedAt: product.get('updatedAt'),
        });
    }

}