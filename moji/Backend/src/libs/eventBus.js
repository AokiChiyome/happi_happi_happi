import { EventEmitter } from "events";

export const chatEmitter = new EventEmitter();
// Increase listener limit for multiple open tabs
chatEmitter.setMaxListeners(100);
