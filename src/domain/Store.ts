import { v4 as uuidv4 } from 'uuid';

import { RegisterStoreDto } from "../usecase/Dto";
import { DomainValidateError } from "./Errors";
import { Tag } from "./valueObjects/Tag";
import { Budget } from "./valueObjects/Budget";
import { ApprovalStatus } from './Enums';
import { StoreApproval } from './valueObjects/StoreApproval';
import { StoreRegisteredEvent } from './domainEvents/Events';
import { Publisher } from './domainEvents/Publishers';

export class Store{
    private storeId: string;
    get StoreId(): string{
        return this.storeId;
    }
    private storeName: string;
    get StoreName(): string{
        return this.storeName;
    }
    private storeLink: string;
    get StoreLink(): string{
        return this.storeLink;
    }
    private storeOverView: string;
    get StoreOverView(): string{
        return this.storeOverView;
    }
    private storeContent: string;
    get StoreContent(): string{
        return this.storeContent;
    }
    private isApproved: ApprovalStatus;
    get IsApproved(): ApprovalStatus{
        return this.isApproved;
    }
    private denialReason: string = "";
    get DenialReason(): string{
        return this.denialReason;
    }
    private storeImageUrl: string;
    get StoreImageUrl(): string{
        return this.storeImageUrl;
    }
    private tags: Tag[] = [];
    get Tags(): Tag[]{
        return this.tags;
    }
    private budget: Budget;
    get Budget(): Budget{
        return this.budget;
    }
    private StoreApproval: StoreApproval;
    get storeApproval(): StoreApproval{
        return this.StoreApproval;
    }
    private storePlaceId: string;
    get StorePlaceId(): string{
        return this.storePlaceId;
    }
    private storeTendencyIds: string[];
    get StoreTendencyIds(): string[]{
        return this.storeTendencyIds;
    }

    constructor(dto: RegisterStoreDto, isRegister: boolean, 
                private publisher: Publisher){
        let result = this.validate(dto);
        if(!result){
            throw new DomainValidateError("Invalid registerStore dto");
        }
        this.storeId = this.createStoreId();
        this.storeName = dto.storeName;
        this.storeLink = dto.storeLink;
        this.storeOverView = dto.storeOverView;
        this.storeContent = dto.storeContent;
        this.storeImageUrl = dto.storeImageUrl;
        this.budget = new Budget(dto.budget);
        this.storePlaceId = dto.storePlaceId;
        this.storeTendencyIds = dto.storeTendencyIds;
        
        for(let tagId of dto.storeTagIds){
            this.tags.push(new Tag(tagId));
        }
        if(isRegister){
            this.isApproved = ApprovalStatus.RegisterPending;
        }else{
            this.isApproved = ApprovalStatus.UpdatePending;
        }
        this.StoreApproval = new StoreApproval(this.isApproved, 
                                               this.denialReason);
    }

    private validate(dto: RegisterStoreDto): boolean{
        if(dto.storeName.length > 30) return false;
        if(dto.storeLink.length > 200) return false;
        if(dto.storeOverView.length > 100) return false;
        if(dto.storeContent.length > 1000) return false;
        if(dto.storeImageUrl.length > 500) return false;
        if(dto.storePlaceId.startsWith("place_") === false) return false;
        for(let tendency of dto.storeTendencyIds){
            if(tendency.startsWith("tendency_") === false) return false;
        }

        return true;
    }

    private createStoreId(): string{
        return "store_" + uuidv4();
    }

    //ドメインイベントの生成、発行
    public storeRegistered(): void{
        const event = new StoreRegisteredEvent(this.storeName, 
                                               this.storeOverView);
        this.publisher.publish(event);
    }

    public equals(other: Store): boolean{
        if(!(other instanceof Store)) return false;
        return this.storeId === other.storeId;
    }

    public hashCode(): number{
        let hash = 0;
        for (let i = 0; i < this.storeId.length; i++) {
            const char = this.storeId.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
}
