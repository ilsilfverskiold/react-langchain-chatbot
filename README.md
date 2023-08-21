# React-Langchain-Chatbot

Basic ChatGPT clone using OpenAI GPT-3.5-Turbo or GPT-4 via Langchain.

Boostrapping with [React-Chatbot-Kit](https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/getting-started) and [LangchainJS](https://js.langchain.com/docs/get_started/introduction).

## Setup and Run the Project

### Prerequisites

- Node.js and npm (If not installed, download from [Node.js official website](https://nodejs.org/))

### Steps

1. **Clone the Repository**:
   
   ```bash
   git clone https://github.com/ilsilfverskiold/react-langchain-chatbot.git
   cd react-langchain-chatbot

3. **Install Dependencies**:
   
   ```bash
   npm install

4. **Set Up OpenAI API Key**:

- Obtain your OpenAI API key.
- Create a .env file in the root directory.
- Add: REACT_APP_OPEN_AI_API_KEY=your_openai_api_key (Replace with your key)

4. **Start the Server**:
   
   ```bash
   npm start

### Work with the langchain processor component

Go to src/components/LangchainProcessor.js

This is a functional component for simplicity, you have access to newMessage and oldMessages so do as you please here. Just remember to return a response to the message.
At the moment this is using the basic chat model by [Langchain](https://js.langchain.com/docs/get_started/quickstart#chat-models) by returning an array with system + human messages for every new prompt.



