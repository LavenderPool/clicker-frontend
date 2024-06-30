interface Prices {
    1: number,
    2: number,
    3: number,
}
export type BoosterNames = 'time' | 'power';
export interface BoosterState {
    power?: number,
    time?: number,
    is_loaded: boolean,
    prices?: {
        power: Prices,
        time: Prices,
    }
}