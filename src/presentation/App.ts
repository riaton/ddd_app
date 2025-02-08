import express, { Request, Response, NextFunction } from "express";
import { RegisterStoreRequest } from "./Api";
import { RegisterStoreDto, GetSignedUrlDto } from "../usecase/Dto";
import { notEmptyCheck } from "./Validator";
import { ErrorResponse, RequiredValidateError } from "./Errors";
import { DomainValidateError } from "../domain/Errors";
import { authenticateJWT } from "./Middleware";
import container from '../infrastructure/DIContainer';
import { IRegisterStoreUseCase } from "../usecase/RegisterStoreUseCase";
import { IGetSignedUrlUseCase } from "../usecase/GetSignedUrlUseCase";
import { DBTransactionError, GCPApiError } from "../usecase/Errors";

const app = express();
app.use(express.json());

//お店登録
app.post("/registerStore", authenticateJWT, async (req: RegisterStoreRequest, res) => {
    //必須パラメータのバリデーション
    //Todo: ログインチェック
    notEmptyCheck(req);
    const dto: RegisterStoreDto = {
        storeName: req.body.storeName,
        storeLink: req.body.storeLink,
        storeOverView: req.body.storeOverView,
        storeContent: req.body.storeContent,
        storeImageUrl: req.body.storeImageUrl,
        budget: req.body.budget,
        storePlaceId: req.body.storePlaceId,
        storeTagIds: req.body.storeTagIds,
        storeTendencyIds: req.body.storeTendencyIds,
        forWhich: req.body.forWhich
    }

    const useCase = container.get<IRegisterStoreUseCase>("IRegisterStoreUseCase");
    await useCase.execute(dto);

    res.send(`<h1>${req.body}</h1>`)
});

//著名付きURL取得
app.get("/getSignedUrl", authenticateJWT, async(req, res) => {
    notEmptyCheck(req);

    const dto: GetSignedUrlDto = {
        fileName: req.body.fileName
    }

    const useCase = container.get<IGetSignedUrlUseCase>("IGetSignedUrlUseCase");
    const signedUrl = await useCase.execute(dto);

    res.send(signedUrl);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: ErrorResponse = {
        message: err.message,
        errorType: ""
    }

    switch (true) {
        case err instanceof RequiredValidateError:
            error.errorType = "RequiredValidateError";
            res.status(400).send(error);
            break;
        case err instanceof DBTransactionError:
            error.errorType = "DB Transaction Error";
            res.status(500).send(error);
            break;
        case err instanceof GCPApiError:
            error.errorType = "GCP API Error";
            res.status(500).send(error);
            break;
        case err instanceof DomainValidateError:
            error.errorType = "DomainValidateError";
            res.status(400).send(err.message);
            break;
        default:
            res.status(500).send("Unknown error");
            break;
    }

    next();
});

app.listen(3000);