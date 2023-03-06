const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const CircularJSON = require('circular-json');


const app = express();
const cors = require('cors');
const port = 3000;

// Initialize OpenAI configuration
const configuration = new Configuration({
    apiKey: apiKey, // replace with your API key
});
const openai = new OpenAIApi(configuration);

app.use(cors());
// Use body-parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/openai-completion', async (req, res) => {
    try {
      if (!req.body.prompt) {
        throw new Error('Request body must include "prompt" field');
      }
      const response = await openai.createCompletion({
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
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
