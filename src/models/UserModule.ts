export interface UserModule {
    id: number,
    first_name: string,
    is_premium: boolean,
    added_to_attachment_menu: boolean,
    allows_write_to_pm: boolean,
    telegram_language_code: string,
    selected_language_code: string,
    public_name: string,
    last_activity: number,
    last_name: string,
    photo_uploaded: boolean,
    telegram_id: number,
    username: string,

    created_at: string,
    updated_at: string,
}

export interface UserStartModule {
    account_age: number,
    opened: boolean,
    opened_age: boolean,
    reward: number
}