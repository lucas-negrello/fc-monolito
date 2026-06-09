import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoice = new GenerateInvoiceUseCase(invoiceRepository);
        const findInvoice = new FindInvoiceUseCase(invoiceRepository);
        return {
            generateInvoice,
            findInvoice,
        };
    }
}