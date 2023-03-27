require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAIController = require('./controllers/openaiController');
const logger = require('./logger/logger');

const app = express();
const port = process.env.PORT || 3000;

const openaiController = new OpenAIController(process.env.OPENAI_API_KEY);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((err, res) => {
  logger.error(err.stack);
  res.status(500).send('Internal server error');
});

try {
  require('dotenv').config();
} catch (err) {
  logger.error('Error loading .env file');
}


app.get('/', (req, res) => {
  logger.info('GET /');
  res.send('Your awesome server is working');
});

app.post('/openai-completion', openaiController.handleCompletionRequest.bind(openaiController), (req, res) => {
  logger.info(`POST /openai-completion with body: ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
