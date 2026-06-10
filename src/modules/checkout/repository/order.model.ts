import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";
import { OrderProductModel } from "./order-product.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    clientId: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    total: number;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;

    @HasMany(() => OrderProductModel)
    declare products: OrderProductModel[];
}
