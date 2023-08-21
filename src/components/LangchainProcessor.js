import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

// this class is responsible for processing new messages from the user and getting a reply from OpenAI
// it uses a human/system messages array that is sent in continously to OpenAI
// you can log the newMessage and oldMessages to see what they look like

const LangchainProcessor = async (newMessage, oldMessages) => {

    // (!!) remember to add your OpenAI API key to the .env file
    const chat = new ChatOpenAI({
        temperature: 0,
        openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY
    });

    try {
        // recreate the formatted messages array with the previous messages every time a new message comes in from the user
        const formattedMessages = oldMessages.map(msg => {
            if (msg.type === "bot") {
                return new SystemMessage(msg.message);
            } else {
                return new HumanMessage(msg.message);
            }
        });

        // Add the new human message to the list
        formattedMessages.push(new HumanMessage(newMessage));

        // call OpenAI to get a reply
        const result = await chat.predictMessages(formattedMessages);

        // Extract the content from the AIMessage
        const botResponseContent = result.content;

        // return the response
        return botResponseContent;

    } catch (error) {
        console.error("Error processing message with OpenAI:", error);
        return "Sorry, I faced an error processing your message.";
    }
}

export default LangchainProcessor;
