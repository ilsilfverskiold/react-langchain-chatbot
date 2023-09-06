# React-Langchain-Chatbot

Basic ChatGPT clone using OpenAI GPT-3.5-Turbo or GPT-4 via Langchain. Good playground for Langchain AI chatbots.

Boostrapping with [React-Chatbot-Kit](https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/getting-started) and [LangchainJS](https://js.langchain.com/docs/get_started/introduction).

## Setup and Run the Project

### Prerequisites

- Node.js v18x and npm (If not installed, download from [Node.js official website](https://nodejs.org/))

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
- Create a .env file in the root directory and add your OpenAI key.

   ```bash
   REACT_APP_OPEN_AI_API_KEY=your_openai_api_key

4. **Start the Server**:
   
   ```bash
   npm start

## Options

1. **ChatGPT Clone**: The script has already been set in `src/components/LangchainProcessor.js` so you can run it as is. If you want to change the prompt template you can do so directly in this file.

   ```javascript
   // The default prompt template is
    const promptTemplate = `
      You are an ironic and nihilistic chatbot so always answer like so. Don't answer in a "response: answer" format.
      Question: {question}
    `;
   ```

2. **A Simple Chain**: Go to `/langchain_options` and find `SimpleChain.js` rename it `LangchainProcessor.js` and replace it with the `LangchainProcessor.js` in the components folder. You can build on top of this yourself but at the moment it is only using the question and not allowing for past answers. Make sure you tweak the prompt template in there.

3. **Q/A with URL**: Here you will first need to set up your Workers route correctly. See [this repository](https://github.com/ilsilfverskiold/cloudflare-workers-langchain) that will go through it step by step. When you have a working endpoint, go to `/langchain_options` in this directory and find `CloudflateWorkersRoute.js` rename it `LangchainProcessor.js` and replace it with the `LangchainProcessor.js` in the components folder. 
- Make sure you set REACT_APP_CLOUDFLARE_WORKERS_AUTH in your .env file that you have set up with your Worker
- Make sure you set the URL for the POST request to the endpoint that you'll receive with the deployment of your worker
- If you are experiencing CORS errors Make sure you allow your IP to access the endpoint (this you set up via your worker)

4. **Q/A with Text file**: Here you will first need to set up your AWS application correctly. See [this repository](https://github.com/ilsilfverskiold/langchainjs-aws-service) or [this tutorial](https://medium.com/gitconnected/deploying-an-ai-powered-q-a-bot-on-aws-with-langchainjs-and-serverless-9361d0778fbd) that will go through it step by step. When you have a working endpoint, go to `/langchain_options` in this directory and find `AWSRoute.js` rename it `LangchainProcessor.js` and replace it with the `LangchainProcessor.js` in the components folder. Or just replace the code directly in the `LangchainProcessor.js` component.

- Make sure you set all your process.env keys in a .env file

   ```bash
   REACT_APP_OPEN_AI_API_KEY=
   REACT_APP_AWS_POST_URL=https://xxxx.execute-api.eu-central-1.amazonaws.com/dev/question
   REACT_APP_AWS_API_KEY=
   REACT_APP_AWS_BUCKET_NAME=my-langchain-bucket

- To set your system and prompt template look into the code in `AWSRoute.js` 

   ```javascript
    // Define the request body
    const requestBody = {
      ...
      promptTemplate: "Use the following pieces of context to answer the question at the end. \n {context}\n Question: {question}\nHelpful Answer:",
      systemTemplate: "I want you to act as a customer service bot called Socky the Happy bot that I am having a conversation with.\nYou are a bot that will provide funny answers to the customer. \n If you can't answer the question say I don't know."
    };
    ```

- If you are experiencing CORS errors Make sure you allow your IP to access the endpoint (look at your AWS lambda scripts)
