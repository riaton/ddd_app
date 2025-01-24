import { Container } from "inversify";
import { IRegisterStoreUseCase, RegisterStoreUseCase } from "../usecase/RegisterStoreUseCase";
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { IGCPBucketRepository } from '../domain/repositories/IGCPBucketRepository';
import { StoresRepository } from "./StoresRepository";
import { GCPBucketRepository } from './GCPBucketRepository';

const container = new Container();

container.bind<IRegisterStoreUseCase>('IRegisterStoreUseCase').to(RegisterStoreUseCase);
container.bind<IStoresRepository>('IStoresRepository').to(StoresRepository);
container.bind<IGCPBucketRepository>('IGCPBucketRepository').to(GCPBucketRepository);

export default container;
