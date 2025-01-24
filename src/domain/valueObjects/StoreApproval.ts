import { DomainValidateError } from "../Errors";
import { ApprovalStatus } from "../Enums";

export class StoreApproval{
    constructor(private approvalStatus: ApprovalStatus, 
                private denialReason: string){
        let result = this.validate(denialReason);
        if(!result){
            throw new DomainValidateError("Invalid store approval entity");
        }
    }

    private validate(denialReason: string): boolean{
        if(denialReason.length > 200) return false;

        return true;
    }

    public equals(other: StoreApproval): boolean{
        if(!(other instanceof StoreApproval)) return false;
        return this.approvalStatus === other.approvalStatus &&
               this.denialReason === other.denialReason;
    }

    public hashCode(): number{
        let hash = 0;

        const combinedValue = this.approvalStatus + "_" + this.denialReason;

        for (let i = 0; i < combinedValue.length; i++) {
            const char = combinedValue.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
}