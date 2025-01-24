export interface IGCPBucketRepository {
    GetSignedUrl(fileName: string): Promise<string>;
}