import { v4 as uuidv4 } from 'uuid';

import { DomainValidateError } from "./Errors";

export class Review{
    private reviewId: string;
    get ReviewId(): string{
        return this.reviewId;
    }
    private storeId: string;
    get StoreId(): string{
        return this.storeId;
    }
    private reviewTitle: string;
    get ReviewTitle(): string{
        return this.reviewTitle;
    }
    private reviewContent: string;
    get ReviewContent(): string{
        return this.reviewContent;
    }

    constructor(storeId: string, title: string, content: string){
        let result = this.validate(title, content);
        if(!result){
            throw new DomainValidateError("Invalid registerStore dto");
        }
        this.reviewId = this.createReviewId();
        this.storeId = storeId;
        this.reviewTitle = title;
        this.reviewContent = content;
    }

    private validate(title: string, content: string): boolean{
        if(title.length > 50) return false;
        if(content.length > 800) return false;

        return true;
    }

    private createReviewId(): string{
        return "review_" + uuidv4();
    }

    public equals(other: Review): boolean{
        if(!(other instanceof Review)) return false;
        return this.reviewId === other.reviewId;
    }

    public hashCode(): number{
        let hash = 0;
        for (let i = 0; i < this.reviewId.length; i++) {
            const char = this.reviewId.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
}