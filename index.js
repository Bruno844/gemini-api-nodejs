require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
//const axios = require('axios');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generative-ai')

const app = express();
const port = 3000;

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle questions and fetch answers from Gemini API
app.post('/chat', async (req, res) => {
  const {message} = req.body
  const apiKey = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = apiKey.getGenerativeModel({ model: "gemini-1.5-flash" });
  

  try {
    const result = await model.generateContent(message);
    res.json({answer: result.response.text().toString()}) ;
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching answer from Gemini API');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});