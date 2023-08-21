"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonixAudioTranscriptionLoader = void 0;
const sonix_speech_recognition_1 = require("sonix-speech-recognition");
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
class SonixAudioTranscriptionLoader extends base_js_1.BaseDocumentLoader {
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
        this.sonixSpeechRecognitionService = new sonix_speech_recognition_1.SonixSpeechRecognitionService(sonixAuthKey);
        this.speechToTextRequest = speechToTextRequest;
    }
    async load() {
        const { text, status, error } = await this.sonixSpeechRecognitionService.speechToText(this.speechToTextRequest);
        if (status === "failed") {
            throw new Error(`Failed to transcribe audio file. Error: ${error}`);
        }
        const document = new document_js_1.Document({
            pageContent: text,
            metadata: {
                fileName: this.speechToTextRequest.fileName,
            },
        });
        return [document];
    }
}
exports.SonixAudioTranscriptionLoader = SonixAudioTranscriptionLoader;
