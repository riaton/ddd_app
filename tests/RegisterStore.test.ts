import { RegisterStoreUseCase } from "../src/usecase/RegisterStoreUseCase";
import { IStoresRepository } from "../src/domain/repositories/IStoresRepository";
import { StoreRegisteredPublisher } from "../src/domain/domainEvents/Publishers";
import { RegisterStoreDto } from "../src/usecase/Dto";
import { Store } from "../src/domain/Store";
import { StoreRegisteredEvent } from "../src/domain/domainEvents/Events";
import { DBTransactionError } from "../src/usecase/Errors";
import db from "../src/infrastructure/KnexDB";

jest.mock('../src/infrastructure/KnexDB');

describe('RegisterStoreUseCase', () => {
    let useCase: RegisterStoreUseCase;
    let storeRegisterRepositoryMock: jest.Mocked<IStoresRepository>;
    let publisherMock: jest.Mocked<StoreRegisteredPublisher>;
    let dbTransactionMock: jest.Mocked<any>;
    let storeDto: RegisterStoreDto;

    beforeEach(() => {
        //モック生成
        storeRegisterRepositoryMock = {
            RegisterStore: jest.fn()
        } as unknown as jest.Mocked<IStoresRepository>;

        //モック生成
        publisherMock = {
            attach: jest.fn(),
            notify: jest.fn(),
            publish: jest.fn()
        } as unknown as jest.Mocked<StoreRegisteredPublisher>;

        //mockを利用してUseCaseを呼び出し
        useCase = new RegisterStoreUseCase(storeRegisterRepositoryMock, publisherMock);

        dbTransactionMock = {
            commit: jest.fn(),
            rollback: jest.fn()
        };
        (db.transaction as jest.Mock).mockResolvedValue(dbTransactionMock);

        storeDto = {
            storeName: "store_name",
            storeLink: "https://aaa.com",
            storeOverView: "store_overview",
            storeContent: "great store",
            storeImageUrl: "good_image",
            budget: 20000, 
            storePlaceId: "place_a",
            storeTagIds: ["tag_a", "tag_b", "tag_c"],
            storeTendencyIds: ["tendency_a", "tendency_b", "tendency_c"]
        }
    });

    it('should call RegisterStore with correct arguments and commit transaction', async() =>{
        await useCase.execute(storeDto);

        expect(storeRegisterRepositoryMock.RegisterStore).toHaveBeenCalledWith(expect.any(Store), dbTransactionMock)
        expect(publisherMock.publish).toHaveBeenCalledWith(expect.any(StoreRegisteredEvent));
        expect(dbTransactionMock.commit).toHaveBeenCalled();
        expect(dbTransactionMock.rollback).not.toHaveBeenCalled();
    })

    it('should rollback transaction and throw DBTransactionError on error', async() => {
        //registerstoreが呼ばれたときにエラーを返すように設定
        storeRegisterRepositoryMock.RegisterStore.mockRejectedValue(new Error("DB Error"));

        await expect(useCase.execute(storeDto)).rejects.toThrow(DBTransactionError);

        expect(dbTransactionMock.rollback).toHaveBeenCalled();
        expect(dbTransactionMock.commit).not.toHaveBeenCalled();
    })
})