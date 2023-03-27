const { Configuration, OpenAIApi } = require('openai');
const CircularJSON = require('circular-json');

class OpenAIController {
  constructor(apiKey) {
    this.configuration = new Configuration({
      apiKey,
    });
    this.apiFactory = new OpenAIApi(this.configuration.apiKey);
  }
  
  async handleCompletionRequest(req, res) {
    try {
      if (!req.body.prompt) {
        throw new Error('Request body must include "prompt" field');
      }

      const response = await this.apiFactory.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt,
        temperature: req.body.temperature || 0.5,
        max_tokens: req.body.max_tokens || 150,
        top_p: req.body.top_p || 1,
        frequency_penalty: req.body.frequency_penalty || 0,
        presence_penalty: req.body.presence_penalty || 0,
      });

      res.status(200).send(CircularJSON.stringify(response));
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  }
}

module.exports = OpenAIController;
