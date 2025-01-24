import { Event, StoreRegisteredEvent } from "./Events";
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDER_GRID_API_KEY === undefined ? 
    "" : process.env.SENDER_GRID_API_KEY);

export interface Observer{
    execute(e: Event): void;
}

export class StoreRegisteredObserver implements Observer{
    execute(e: StoreRegisteredEvent): void{
        //メール送信処理
        const msg = {
            to: process.env.MAIL_TO === undefined ? "" : process.env.MAIL_TO,
            from: process.env.SENDER_EMAIL === undefined ? "" : process.env.SENDER_EMAIL,
            subject: "お店承認リクエスト受信",
            text: `Store: ${e.storeName} Overview: ${e.storeOverView}`,
            html: `<strong>${e.storeName}</strong>が登録されました。`
        };

        sgMail.send(msg)
        .then(() => {
            console.log("mail sent." + e.storeName + e.storeOverView);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}