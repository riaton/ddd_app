//お店登録
export interface RegisterStoreDto{
    storeName: string; //30文字、必須
    storeLink: string; //200文字、必須
    storeOverView: string; //100文字、必須
    storeContent: string; //1000文字、必須
    storeImageUrl: string; //1つまで、必須
    budget: number; //5000の倍数、5000 - 150000、必須
    storePlaceId: string; //place_で始まること、必須
    storeTagIds: string[]; //tag_で始まること、必須
    storeTendencyIds: string[]; //tendency_で始まること、必須
}

//著名付きURL取得
export interface GetSignedUrlDto{
    fileName: string; //必須
}