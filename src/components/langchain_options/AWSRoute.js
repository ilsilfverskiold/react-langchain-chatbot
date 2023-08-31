const LangchainProcessor = async (newMessage, oldMessages = []) => {
  
    // Check if newMessage contains "thank you" or "thanks"
    if (newMessage.toLowerCase().includes("thank you") || newMessage.toLowerCase().includes("thanks")) {
      oldMessages = [];
    }
  
    // Construct the history from oldMessages
    const historyArr = oldMessages.map((item) => `${item.type === "user" ? "human" : item.type}: ${item.message}`);
  
    // Check if a user message exists in oldMessages
    const hasPreviousUserMessage = oldMessages.some(
      (item) => item.type === "user"
    );
  
    // Determine the chatHistory based on previous user messages
    const chatHistory = hasPreviousUserMessage ? historyArr.join("\n") : "";
  
    // Define the request body
    const requestBody = {
      question: newMessage,
      chatHistory: chatHistory,
      bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    };
  
    try {
      // Send a POST request to the endpoint
      const response = await fetch(process.env.REACT_APP_AWS_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_AWS_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to get a response from the server.");
      }
  
      const responseData = await response.text();
      const parsedData = JSON.parse(responseData);
      return parsedData.text.trim();
    } catch (error) {
      console.error("Error processing message with OpenAI:", error);
      return "Sorry, I faced an error processing your message.";
    }
  };
  
  export default LangchainProcessor;
