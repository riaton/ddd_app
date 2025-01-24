export interface Event{}

export class StoreRegisteredEvent implements Event{
    constructor(public storeName: string, 
                public storeOverView: string){}
}