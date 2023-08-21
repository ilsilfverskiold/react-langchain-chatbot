import LangchainProcessor from './LangchainProcessor';

class MessageParser {
    constructor(actionProvider, state, createChatBotMessage) {
        this.actionProvider = actionProvider;
        this.state = state;
        this.createChatBotMessage = createChatBotMessage;
    }

    async parse(incomingMessage) {
        // Use the processor to get a reply
        const reply = await LangchainProcessor(incomingMessage, this.state.messages);
        
        // Send the reply using the actionProvider
        this.actionProvider.sendBotResponse(reply);
    }
}

export default MessageParser;
