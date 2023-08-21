import { SonixSpeechRecognitionService } from "sonix-speech-recognition";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export class SonixAudioTranscriptionLoader extends BaseDocumentLoader {
    constructor({ sonixAuthKey, request: speechToTextRequest, }) {
        super();
        Object.defineProperty(this, "sonixSpeechRecognitionService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "speechToTextRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.sonixSpeechRecognitionService = new SonixSpeechRecognitionService(sonixAuthKey);
        this.speechToTextRequest = speechToTextRequest;
    }
    async load() {
        const { text, status, error } = await this.sonixSpeechRecognitionService.speechToText(this.speechToTextRequest);
        if (status === "failed") {
            throw new Error(`Failed to transcribe audio file. Error: ${error}`);
        }
        const document = new Document({
            pageContent: text,
            metadata: {
                fileName: this.speechToTextRequest.fileName,
            },
        });
        return [document];
    }
}
