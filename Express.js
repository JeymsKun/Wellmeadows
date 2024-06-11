const express = require('express');
const { callLargeLanguageModel } = require('./llm-api'); 

const app = express();
const port = 3000;

app.get('/api/generate-text', async (req, res) => {
  const prompt = req.query.prompt; 
  if (!prompt) {
    return res.status(400).send('Missing prompt parameter');
  }

  try {
    const response = await callLargeLanguageModel(prompt);
    res.json({ text: response });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
