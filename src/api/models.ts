import { ModelCtor } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import ProductAdmModel from "../modules/product-adm/repository/product.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import { TransactionModel } from "../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../modules/invoice/repository/invoice-item.model";
import { OrderModel } from "../modules/checkout/repository/order.model";
import { OrderProductModel } from "../modules/checkout/repository/order-product.model";

/**
 * Todos os models do monólito. `ProductAdmModel` e `StoreCatalogProductModel`
 * apontam para a MESMA tabela `product` (criada pela migration unificada), por
 * isso convivem aqui sem `sync()` — quem cria o schema é o Umzug.
 */
export const models: ModelCtor[] = [
    ClientModel,
    ProductAdmModel,
    StoreCatalogProductModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemModel,
    OrderModel,
    OrderProductModel,
];
