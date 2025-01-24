import { Store } from "../Store";
import { Knex } from "knex";

export interface IStoresRepository {
    RegisterStore(store: Store, trx: Knex.Transaction): Promise<void>;
}