import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "../facade/client-adm.facade";

export default class ClientAdmFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();
        const addUseCase = new AddClientUseCase(clientRepository);
        const findUseCase = new FindClientUseCase(clientRepository);
        return new ClientAdmFacade({
            addUseCase: addUseCase,
            findUseCase: findUseCase,
        });
    }
}