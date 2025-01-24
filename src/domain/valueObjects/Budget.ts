import { DomainValidateError } from "../Errors";

export class Budget{
    get Value(): number{
        return this.value;
    }
    constructor(private value: number){
        let result = this.validate(value);
        if(!result){
            throw new DomainValidateError("Invalid budget value at store");
        }
    }

    private validate(budget: number): boolean{
        if(budget % 5000 !== 0) return false;
        if(budget > 100000 || budget < 5000) return false;

        return true;
    }

    public equals(other: Budget): boolean{
        if(!(other instanceof Budget)) return false;
        return this.value === other.value;
    }

    public hashCode(): number{
        let hash = 0;

        const budgetValue = typeof this.value === 'number'
            ? this.value.toString()
            : this.value;
        for (let i = 0; i < budgetValue.length; i++) {
            const char = budgetValue.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
}