import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    text: string;
    author: string;
    timestamp: bigint;
}
export interface backendInterface {
    addMessage(author: string, text: string): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
}
