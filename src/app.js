const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());

app.get('/api/js', async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Create a list of 8 questions for my interview with a science fiction author:\n\n1. What inspired you to write science fiction?\n2. What themes do you explore in your writing?\n3. How has the genre of science fiction changed over the years?\n4. What do you think are the key elements of a good science fiction story?\n5. What is the most difficult part of writing science fiction?\n6. What advice would you give to aspiring science fiction authors?\n7. How do you stay up to date with the latest trends in science fiction?\n8. How has your writing process evolved over time?",
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);
  // Convert the CompletionResult instance to a plain object
  const responseObject = response.toJSON();

  // Send the plain object as JSON
  res.json(responseObject);
});

module.exports = app;