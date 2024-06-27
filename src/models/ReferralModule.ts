interface ReferralModule {
    id: number,
    user_id: number,
    referred_by: number,
    user: UserModule,

    created_at: string,
    updated_at: string,
}
