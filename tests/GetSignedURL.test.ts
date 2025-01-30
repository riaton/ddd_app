import { GetSignedUrlUseCase } from "../src/usecase/GetSignedUrlUseCase";
import { IGCPBucketRepository } from "../src/domain/repositories/IGCPBucketRepository";
import { GetSignedUrlDto } from "../src/usecase/Dto";
import { GCPApiError } from "../src/usecase/Errors";

describe('GetSignedURLUseCase', () => {
    let useCase: GetSignedUrlUseCase;
    let GCPBucketRepositoryMock: jest.Mocked<IGCPBucketRepository>;
    let getSignedUrlDto: GetSignedUrlDto;

    beforeEach(() => {
        GCPBucketRepositoryMock = {
            GetSignedUrl: jest.fn()
        } as unknown as jest.Mocked<IGCPBucketRepository>;

        useCase = new GetSignedUrlUseCase(GCPBucketRepositoryMock);

        getSignedUrlDto = {
            fileName: "aaa.jpg"
        }
    })

    it('should call GetSignedUrl with correct arguments', async() =>{
        await useCase.execute(getSignedUrlDto);

        expect(GCPBucketRepositoryMock.GetSignedUrl).toHaveBeenCalledWith(getSignedUrlDto.fileName);
    })

    it('should throw GCPApiError on error', async() => {
        GCPBucketRepositoryMock.GetSignedUrl.mockRejectedValue(new Error("GCP Error"));

        await expect(useCase.execute(getSignedUrlDto)).rejects.toThrow(GCPApiError);
    })
})