import CheckoutGateway from "../gateway/checkout.gateway";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { OrderModel } from "./order.model";
import { OrderProductModel } from "./order-product.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order.id.id,
                clientId: order.client.id.id,
                status: order.status,
                total: order.total,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                products: order.products.map((product) => ({
                    id: new Id().id,
                    orderId: order.id.id,
                    productId: product.id.id,
                })),
            },
            {
                include: [OrderProductModel],
            }
        );
    }

    async findOrder(id: string): Promise<Order | null> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [
                { model: ClientModel },
                { model: OrderProductModel, include: [{ model: ProductModel }] },
            ],
        });

        if (!order) {
            return null;
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.client.id),
                name: order.client.name,
                email: order.client.email,
                address: order.client.street,
            }),
            products: order.products.map(
                (orderProduct) =>
                    new Product({
                        id: new Id(orderProduct.product.id),
                        name: orderProduct.product.name,
                        description: orderProduct.product.description,
                        salePrice: orderProduct.product.salePrice,
                    })
            ),
            status: order.status,
        });
    }
}
