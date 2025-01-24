import { IStoresRepository } from "../domain/repositories/IStoresRepository";
import { Store } from "../domain/Store";
import db from "./KnexDB";
import { Knex } from "knex";

export class StoresRepository implements IStoresRepository{
    async RegisterStore(store: Store, trx: Knex.Transaction): Promise<void>{
        await db('main_stores')
            .transacting(trx)
            .insert({
                store_id: store.StoreId,
                store_name: store.StoreName,
                store_link: store.StoreLink,
                store_budget: store.Budget.Value,
                store_overview: store.StoreOverView,
                store_content: store.StoreContent,
                store_place_id: store.StorePlaceId,
                store_image_url: store.StoreImageUrl,
                store_approval: store.IsApproved,
                denial_reason: store.DenialReason,
                created_at: new Date(),
                updated_at: new Date()
            });
        
        await db('main_store_tendencies')
            .transacting(trx)
            .insert(store.StoreTendencyIds.map((tendencyId) => {
                return {
                    store_id: store.StoreId,
                    tendency_id: tendencyId
                }
            }));
    }
}