import {UserModule} from "./UserModule";

export interface ReferralModule {
    id: number,
    user_id: number,
    referred_by: number,
    user: UserModule,
    collected: number,

    created_at: string,
    updated_at: string,
}
