import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { Embeddings } from "./base.js";
import { getEnvironmentVariable } from "../util/env.js";
export class GooglePaLMEmbeddings extends Embeddings {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "models/embedding-gecko-001"
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.modelName = fields?.modelName ?? this.modelName;
        this.apiKey =
            fields?.apiKey ?? getEnvironmentVariable("GOOGLE_PALM_API_KEY");
        if (!this.apiKey) {
            throw new Error("Please set an API key for Google Palm 2 in the environment variable GOOGLE_PALM_API_KEY or in the `apiKey` field of the GooglePalm constructor");
        }
        this.client = new TextServiceClient({
            authClient: new GoogleAuth().fromAPIKey(this.apiKey),
        });
    }
    async _embedText(text) {
        // replace newlines, which can negatively affect performance.
        const cleanedText = text.replace(/\n/g, " ");
        const res = await this.client.embedText({
            model: this.modelName,
            text: cleanedText,
        });
        return res[0].embedding?.value ?? [];
    }
    embedQuery(document) {
        return this.caller.callWithOptions({}, this._embedText.bind(this), document);
    }
    embedDocuments(documents) {
        return Promise.all(documents.map((document) => this._embedText(document)));
    }
}
