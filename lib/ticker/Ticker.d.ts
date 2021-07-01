export interface Ticker {
    now(): number;
}
export declare class SystemTicker implements Ticker {
    now(): number;
}
