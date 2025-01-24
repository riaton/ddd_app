import { GetSignedUrlDto } from "./Dto";
import { IGCPBucketRepository } from "../domain/repositories/IGCPBucketRepository";
import { GCPApiError } from "./Errors";

export class RegisterStoreUseCase implements IGetSignedUrlUseCase{
    constructor(private repository: IGCPBucketRepository){}
    
    async execute(dto: GetSignedUrlDto): Promise<string>{
        try{
            return await this.repository.GetSignedUrl(dto.fileName);
        }catch(error){
            throw new GCPApiError("Error on GCP API");
        }
    }
}

export interface IGetSignedUrlUseCase{
    execute(dto: GetSignedUrlDto): Promise<string>;
}