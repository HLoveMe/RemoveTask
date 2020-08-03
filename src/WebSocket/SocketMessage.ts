
export enum MessageType {
  INFO_KEY = 100,
}
export declare interface Message {
  date: number;
  id: number;
  name: string;
  data: any;
}