class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    sendBotResponse(message) {
        const botMessage = this.createChatBotMessage(message);
        this.updateChatbotState(botMessage);
    }

    updateChatbotState(message) {
        this.setState(prevState => ({
            ...prevState, 
            messages: [...prevState.messages, message]
        }));
    }
}

export default ActionProvider;