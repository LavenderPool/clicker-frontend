export const MAIN_PAGE = '/'
export const BOOSTERS_PAGE = '/boosters'
export const FRIENDS_PAGE = '/friends'
export const TASKS_PAGE = '/tasks'
export const ROULETTE_PAGE = '/roulette'
export const WITHDRAWAL_USDT = '/withdrawal/usdt'
export const REWARD_PAGE = '/reward/:amount/:task_id'
export const UPGRADE_PAGE = '/upgrade/:booster'
export const PROFILE_PAGE = '/profile'
export const START_PAGE = '/start'
export const AGE_REWARD_PAGE = '/age-reward'
export const SHARE_LINK_PAGE = '/share-link'
export const languages = [
    {
        'short_code': 'ru',
        'name_en': 'Russian',
        'name': 'Русский',
        'img': './flags/russian.png',
    },
    {
        'short_code': 'en',
        'name_en': 'English',
        'name': 'English',
        'img': './flags/english.png',
    },
    {
        'short_code': 'es',
        'name_en': 'Spanish',
        'name': 'Español',
        'img': './flags/spanish.png',
    },
    {
        'short_code': 'id',
        'name_en': 'Indonesia',
        'name': 'Indonesia',
        'img': './flags/indonesia.png',
    }
]

export const upgrades = {
    "power": ["+ 200 / 2h", "+ 500 / 2h", "+ 1000 / 2h", "+ 1500 / 2h"],
    "time": ["150 / 3h", "600 / 6h", "1200 / 12h", "2400 / 24h"]
}