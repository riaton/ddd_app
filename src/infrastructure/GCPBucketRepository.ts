import { IGCPBucketRepository } from "../domain/repositories/IGCPBucketRepository";
import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

export class GCPBucketRepository implements IGCPBucketRepository{
    private storage: Storage;

    constructor(private bucketName: string){
        this.storage = new Storage();
    }

    async GetSignedUrl(fileName: string): Promise<string>{
        const options: GetSignedUrlConfig = {
            action: 'write',
            version: 'v4',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: 'application/octet-stream',
        };

        const [url] = await this.storage.bucket(this.bucketName).file(fileName).getSignedUrl(options);
        return url;
    }
}