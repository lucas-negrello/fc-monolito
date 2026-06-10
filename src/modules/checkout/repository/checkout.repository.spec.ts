import initSequelize from "../../@shared/test/init.sequelize";
import { ClientModel } from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";
import { OrderModel } from "./order.model";
import { OrderProductModel } from "./order-product.model";
import CheckoutRepository from "./checkout.repository";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("CheckoutRepository test", () => {
    initSequelize([ClientModel, ProductModel, OrderModel, OrderProductModel]);

    it("should add an order and find it back with related client and products", async () => {
        // Cliente e produtos precisam existir para os relacionamentos serem resolvidos
        await ClientModel.create({
            id: "c1",
            name: "Client 1",
            email: "client1@example.com",
            document: "12345678900",
            street: "Main Street",
            number: "123",
            complement: "Apt 1",
            city: "Springfield",
            state: "SP",
            zipcode: "12345-678",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await ProductModel.create({
            id: "p1",
            name: "Product 1",
            description: "Product 1 description",
            salePrice: 150,
        });
        await ProductModel.create({
            id: "p2",
            name: "Product 2",
            description: "Product 2 description",
            salePrice: 50,
        });

        const order = new Order({
            id: new Id("o1"),
            client: new Client({
                id: new Id("c1"),
                name: "Client 1",
                email: "client1@example.com",
                address: "Main Street",
            }),
            products: [
                new Product({ id: new Id("p1"), name: "Product 1", description: "Product 1 description", salePrice: 150 }),
                new Product({ id: new Id("p2"), name: "Product 2", description: "Product 2 description", salePrice: 50 }),
            ],
            status: "approved",
        });

        const repository = new CheckoutRepository();
        await repository.addOrder(order);

        const result = await repository.findOrder("o1");

        expect(result).not.toBeNull();
        expect(result.id.id).toBe("o1");
        expect(result.status).toBe("approved");
        expect(result.total).toBe(200);

        // Cliente reidratado via relacionamento
        expect(result.client.id.id).toBe("c1");
        expect(result.client.name).toBe("Client 1");
        expect(result.client.email).toBe("client1@example.com");
        expect(result.client.address).toBe("Main Street");

        // Produtos reidratados via relacionamento
        expect(result.products).toHaveLength(2);
        expect(result.products[0].id.id).toBe("p1");
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].salePrice).toBe(150);
        expect(result.products[1].id.id).toBe("p2");
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].salePrice).toBe(50);
    });

    it("should return null when order does not exist", async () => {
        const repository = new CheckoutRepository();
        const result = await repository.findOrder("does-not-exist");
        expect(result).toBeNull();
    });
});
