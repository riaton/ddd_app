import { RegisterStoreDto } from "./Dto";
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { Store } from '../domain/Store';
import { StoreRegisteredPublisher } from "../domain/domainEvents/Publishers";
import { StoreRegisteredObserver } from "../domain/domainEvents/Observers";
import db from "../infrastructure/KnexDB";
import { DomainValidateError } from "../domain/Errors";
import { DBTransactionError } from "./Errors";

export class RegisterStoreUseCase implements IRegisterStoreUseCase{
    constructor(private storeRegisterRepository: IStoresRepository,
                private publisher: StoreRegisteredPublisher){
                    this.publisher.attach(new StoreRegisteredObserver());
                }
    
    async execute(storeDto: RegisterStoreDto): Promise<void>{
        const store = new Store(storeDto, true, this.publisher);
        const trx = await db.transaction();
        try{
            await this.storeRegisterRepository.RegisterStore(store, trx);
            store.storeRegistered();
            await trx.commit();
        }catch(error){
            await trx.rollback();
            if(error instanceof DomainValidateError){
                throw error;
            }
            throw new DBTransactionError("Error on db transaction");
        }
    }
}

export interface IRegisterStoreUseCase{
    execute(storeDto: RegisterStoreDto): Promise<void>;
}
