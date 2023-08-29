# React-Langchain-Chatbot

Basic ChatGPT clone using OpenAI GPT-3.5-Turbo or GPT-4 via Langchain.

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
- Create a .env file in the root directory.
- Add: REACT_APP_OPEN_AI_API_KEY=your_openai_api_key (Replace with your key)

4. **Start the Server**:
   
   ```bash
   npm start

## Options

1. **ChatGPT Clone**: The script has already been set in src/components/LangchainProcessor.js so you can run it as is. If you want to change the prompt template you can do so directly in this file.

2. **A Simple Chain**: Go to langchain_options and find SimpleChain.js rename it LangchainProcessor.js and replace it with the LangchainProcessor.js in the components folder. You can build on top of this yourself but at the moment it is only using the question and not allowing for past answers. Make sure you tweak the prompt template in there.

3. **Q/A with URL**: Go to langchain_options and find CloudflateWorkersRoute.js rename it LangchainProcessor.js and replace it with the LangchainProcessor.js in the components folder. Here you will first need to set up your Workers route correctly. See [this repository](https://github.com/ilsilfverskiold/cloudflare-workers-langchain) that will go through it step by step. 
- Make sure you set REACT_APP_CLOUDFLARE_WORKERS_AUTH in your .env file that you have set up with your Worker
- If you are experiencing CORS errors Make sure you allow your IP to access the endpoint (this you set up via your worker)




