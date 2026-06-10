import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutRepository from "../repository/checkout.repository";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/facade.factory";

export default class CheckoutFactory {
    static create(): PlaceOrderUseCase {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();
        const repository = new CheckoutRepository();

        return new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            catalogFacade,
            repository,
            invoiceFacade,
            paymentFacade
        );
    }
}
