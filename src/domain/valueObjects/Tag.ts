import { DomainValidateError } from "../Errors";

export class Tag{
    constructor(private value: string){
        let result = this.validate(value);
        if(!result){
            throw new DomainValidateError("Invalid tag name");
        }
    }

    private validate(tagName: string): boolean{
        if(tagName.length > 20){
            return false;
        }
        if(!tagName.startsWith("tag_")){
            return false;
        }

        return true;
    }

    public equals(other: Tag): boolean{
        if(!(other instanceof Tag)) return false;
        return this.value === other.value;
    }

    public hashCode(): number{
        let hash = 0;

        for (let i = 0; i < this.value.length; i++) {
            const char = this.value.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
}