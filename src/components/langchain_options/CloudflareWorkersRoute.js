

// using functional components instead of class components to keep it simple here

// this component is responsible for processing new messages from the user and getting a reply via a Cloudflare Worker route
// see this repo to create your worker: https://github.com/ilsilfverskiold/cloudflare-workers-langchain

// replace your correct url below and set your secret key in your .env file

const LangchainProcessor = async (newMessage, oldMessages = []) => {

    // Construct the history from oldMessages
    const historyArr = oldMessages.map(item => `${item.type}: ${item.message}`);
    historyArr.push(`user: ${newMessage}`);
    const history = historyArr.join('\n');

    // Check if a user message exists in oldMessages
    const hasPreviousUserMessage = oldMessages.some(item => item.type === 'user');

    // Define the request body
    const requestBody = {
        question: newMessage,
        history: hasPreviousUserMessage ? history : "",
    };

    try {
        // Send a POST request to the endpoint
        const response = await fetch("URL_HERE", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.REACT_APP_CLOUDFLARE_WORKERS_AUTH
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Failed to get a response from the server.");
        }

        const data = await response.text();
        return data.trim();
    } catch (error) {
        console.error("Error processing message with OpenAI:", error);
        return "Sorry, I faced an error processing your message.";
    }
};

export default LangchainProcessor;