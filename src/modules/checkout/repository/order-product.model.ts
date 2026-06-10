import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import type { OrderModel as OrderModelType } from "./order.model";
import ProductModel from "../../store-catalog/repository/product.model";

@Table({
    tableName: "order_products",
    timestamps: false,
})
export class OrderProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModelType;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;
}
