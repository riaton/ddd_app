import { Request, Response } from "express";

//署名付きURL取得
export interface GetSignedUrlRequest extends Request{
    body:{
        fileName: string;
        fileType: string;
    }
}

//マスタテーブル取得
export interface GetMasterResponse extends Response{
    body:{
        places: [
            {
                placeId: string;
                placeName: string;
            }
        ],
        tags: [
            {
                tagId: string;
                tagName: string;
            }
        ],
        tendencies: [
            {
                tendencyId: string;
                tendencyName: string;
            }
        ]
    }
}

//口コミ登録
export interface PostReviewRequest extends Request{
    storeId: string;
    reviewTitle: string;
    review: string;
}

//お店検索(Request)
export interface GetStoreRequest extends Request{
    body:{
        page: number;
        tendency: string;
        place: string;
        tag: string;
        storeName: string;
        minCost: number;
        maxCost: number;
    }
}

//お店検索(Response)
export interface GetStoreResponse extends Response{
    body:[
        {
            storeId: string;
            storeName: string;
            storeLink: string;
            storeOverView: string;
            storeContent: string;
            storeImageUrls: string[];
            budget: number;
            storePlaceId: string;
            storeTagIds: string[];
            storeTendencyIds: string[];
        }
    ]
}

//お店いいね！
export interface LikeStoreRequest extends Request{
    body:{
        //userId: string;
        storeId: string;
    }
}

//お店登録
export interface RegisterStoreRequest extends Request{
    body:{
        storeName: string; //30文字、必須
        storeLink: string; //200文字、必須
        storeOverView: string; //100文字、必須
        storeContent: string; //1000文字、必須
        storeImageUrl: string; //1つまで、必須
        budget: number; //5000の倍数、5000 - 150000、必須
        storePlaceId: string; //place_で始まること、必須
        storeTagIds: string[]; //tag_で始まること、20文字、必須
        storeTendencyIds: string[]; //tendency_で始まること、必須
        forWhich: string; //man or woman、必須
    }
}

//お店更新
export interface UpdateStoreRequest extends Request{
    body:{
        storeName: string;
        storeLink: string;
        storeOverView: string;
        storeContent: string;
        storeImageUrls: string[];
        cost: number;
        storePlaceId: string;
        storeTagIds: string[];
        storeTendencyIds: string[];
    }
}

//お店削除
export interface DeleteStoreRequest extends Request{
    body:{
        storeName: string;
    }
}
