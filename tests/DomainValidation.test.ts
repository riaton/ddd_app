import { DomainValidateError } from "../src/domain/Errors";
import { Budget } from "../src/domain/valueObjects/Budget";
import { StoreApproval } from "../src/domain/valueObjects/StoreApproval";
import { ApprovalStatus } from "../src/domain/Enums";
import { Tag } from "../src/domain/valueObjects/Tag";
import { Store } from "../src/domain/Store";
import { RegisterStoreDto } from "../src/usecase/Dto";
import { StoreRegisteredPublisher } from "../src/domain/domainEvents/Publishers";


describe('domain validation test', () =>{
    const len200: string = `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaa`.replace(/\s+/g, '');

    let storeDto: RegisterStoreDto;
    let publisherMock: jest.Mocked<StoreRegisteredPublisher>;

    beforeEach(() => {
        publisherMock = {
            attach: jest.fn(),
            notify: jest.fn(),
            publish: jest.fn()
        } as unknown as jest.Mocked<StoreRegisteredPublisher>;

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

    it('validation test on Budget instance', () =>{
        expect(() => new Budget(5000)).not.toThrow();
        expect(() => new Budget(100000)).not.toThrow(DomainValidateError);

        expect(() => new Budget(4000)).toThrow(DomainValidateError);
        expect(() => new Budget(4999)).toThrow(DomainValidateError);
        expect(() => new Budget(100001)).toThrow(DomainValidateError);
    });

    it('validation test on Tag instance', () =>{
        expect(() => new Tag("tag_aaaaaaaaaaaaaaaa")).not.toThrow();
        
        expect(() => new Tag("tag_aaaaaaaaaaaaaaaaa")).toThrow(DomainValidateError);
        expect(() => new Tag("aaaaaaaaaaaaaaaaaaaa")).toThrow(DomainValidateError);
    });

    it('validation test on StoreApproval instance', () =>{
        expect(() => new StoreApproval(ApprovalStatus.Rejected, len200)).not.toThrow();

        expect(() => new StoreApproval(ApprovalStatus.Rejected, len200 + "a")).toThrow(DomainValidateError);
    });

    it('validation test on Store instance', () =>{
        expect(() => new Store(storeDto, true, publisherMock)).not.toThrow();
        //Todo: 後で
    });
})