import { Redis } from "ioredis";
import { BaseListChatMessageHistory } from "../../schema/index.js";
import { mapChatMessagesToStoredMessages, mapStoredMessagesToChatMessages, } from "./utils.js";
export class RedisChatMessageHistory extends BaseListChatMessageHistory {
    get lc_secrets() {
        return {
            url: "REDIS_URL",
            "config.username": "REDIS_USERNAME",
            "config.password": "REDIS_PASSWORD",
        };
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "stores", "message", "ioredis"]
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { sessionId, sessionTTL, url, config, client } = fields;
        this.client = (client ??
            (url ? new Redis(url) : new Redis(config ?? {})));
        this.sessionId = sessionId;
        this.sessionTTL = sessionTTL;
    }
    async getMessages() {
        const rawStoredMessages = await this.client.lrange(this.sessionId, 0, -1);
        const orderedMessages = rawStoredMessages
            .reverse()
            .map((message) => JSON.parse(message));
        return mapStoredMessagesToChatMessages(orderedMessages);
    }
    async addMessage(message) {
        const messageToAdd = mapChatMessagesToStoredMessages([message]);
        await this.client.lpush(this.sessionId, JSON.stringify(messageToAdd[0]));
        if (this.sessionTTL) {
            await this.client.expire(this.sessionId, this.sessionTTL);
        }
    }
    async clear() {
        await this.client.del(this.sessionId);
    }
}
