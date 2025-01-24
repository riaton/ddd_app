import { Observer } from "./Observers";
import { Event } from "./Events";

export abstract class Publisher{
    private observers: Observer[] = [];
    constructor(){}

    attach(observer: Observer): void{
        this.observers.push(observer);
    }

    detach(observer: Observer): void{
        this.observers = this.observers.filter(o => o !== observer);
    }

    notify(e: Event): void{
        this.observers.forEach(o => o.execute(e));
    }

    abstract publish(e: Event): void;
}

export class StoreRegisteredPublisher extends Publisher{
    publish(e: Event): void{
        this.notify(e);
    }
}