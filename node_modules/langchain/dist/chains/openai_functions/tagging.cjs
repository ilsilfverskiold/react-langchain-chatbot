"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaggingChainFromZod = exports.createTaggingChain = void 0;
const zod_to_json_schema_1 = require("zod-to-json-schema");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const openai_functions_js_1 = require("../../output_parsers/openai_functions.cjs");
const llm_chain_js_1 = require("../llm_chain.cjs");
function getTaggingFunctions(schema) {
    return [
        {
            name: "information_extraction",
            description: "Extracts the relevant information from the passage.",
            parameters: schema,
        },
    ];
}
const TAGGING_TEMPLATE = `Extract the desired information from the following passage.

Passage:
{input}
`;
function createTaggingChain(schema, llm, options = {}) {
    const { prompt = prompt_js_1.PromptTemplate.fromTemplate(TAGGING_TEMPLATE), ...rest } = options;
    const functions = getTaggingFunctions(schema);
    const outputParser = new openai_functions_js_1.JsonOutputFunctionsParser();
    return new llm_chain_js_1.LLMChain({
        llm,
        prompt,
        llmKwargs: { functions },
        outputParser,
        tags: ["openai_functions", "tagging"],
        ...rest,
    });
}
exports.createTaggingChain = createTaggingChain;
function createTaggingChainFromZod(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema, llm, options) {
    return createTaggingChain((0, zod_to_json_schema_1.zodToJsonSchema)(schema), llm, options);
}
exports.createTaggingChainFromZod = createTaggingChainFromZod;
