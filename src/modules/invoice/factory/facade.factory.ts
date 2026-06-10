import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "../facade/invoice.facade";
import { InvoiceFacadeInterface } from "../facade/invoice.facade.interface";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoice = new GenerateInvoiceUseCase(invoiceRepository);
        const findInvoice = new FindInvoiceUseCase(invoiceRepository);
        return new InvoiceFacade({
            generateInvoice,
            findInvoice,
        });
    }
}
